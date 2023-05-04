import { Button, Colors, momentFormat, Typo, View } from "@/modules"
import { Todo } from "@/types"
import moment from "moment"
import React, { PropsWithChildren, useCallback, useEffect, useState } from "react"
import { ContentSection, Radio, TitleSection } from "../utils"
import { RiDeleteBack2Line, RiCheckboxCircleLine, RiEditLine } from "react-icons/ri"
import { AiOutlineMinusCircle } from "react-icons/ai"
import { CSSProperties } from "@stitches/react"
import { useAuth, usePopup, useTodo } from "@/context"
import { AddTodoModal } from "./AddTodoModal"
import { BiPlusCircle } from "react-icons/bi"

interface Props extends Todo {
  isOthers?: boolean
}
export default function TodoItem(props: Props) {
  console.log(props.isOthers)
  const [isClicked, setIsClicked] = useState(false)
  const clickHandler = useCallback(() => setIsClicked((prev) => !prev), [])

  const { modal } = usePopup()
  const onEdit = useCallback(() => {
    modal(props.title, <AddTodoModal payload={props} />)
  }, [modal])

  const { deleteTodo, doneTodo, meToo } = useTodo()
  const onDone = useCallback(() => {
    doneTodo(props.id).then((res) => console.log(res))
  }, [props.id, doneTodo])
  const onDelete = useCallback(() => deleteTodo(props.id).then((res) => console.log(res)), [deleteTodo, props.id])

  const onMetoo = useCallback(() => meToo(props).then((res) => console.log(res)), [meToo])
  return (
    <>
      {isClicked ? (
        <ClickedItem {...props} clickHandler={clickHandler} onEdit={onEdit} onDone={onDone} onDelete={onDelete} onMetoo={onMetoo}>
          <RadioItem clickHandler={clickHandler} isClicked={isClicked} />
        </ClickedItem>
      ) : (
        <Item {...props} clickHandler={clickHandler} onEdit={onEdit} onDone={onDone} onDelete={onDelete} onMetoo={onMetoo}>
          <RadioItem clickHandler={clickHandler} isClicked={isClicked} />
        </Item>
      )}
    </>
  )
}

interface RadioProps {
  isClicked: boolean
  clickHandler: () => void
}
function RadioItem({ clickHandler, isClicked }: RadioProps) {
  return (
    <Radio
      onPress={clickHandler}
      state={isClicked}
      style={{
        position: "absolute",
        top: "50%",
        left: 0,
        transform: "translate(-50%, -50%)",
        "&:active": {
          transform: "translate(-50%, -50%) scale(.9)",
        },
      }}
    />
  )
}

interface ItemProps extends Props, PropsWithChildren {
  clickHandler: () => void
  onEdit: () => void
  onDone: () => void
  onDelete: () => void
  onMetoo: () => void
}
function ClickedItem({ body, createdAt, createdBy, id, title, children, clickHandler, onDelete, onDone, onEdit, isDone, isOthers, onMetoo }: ItemProps) {
  const [isHovering, setIsHovering] = useState(false)
  const onHover = useCallback(() => setIsHovering(true), [])
  const onLeave = useCallback(() => setIsHovering(false), [])

  const { user } = useAuth()
  useEffect(() => {
    const check = user === createdBy
    console.log(check, user, createdBy)
  }, [user, createdBy])

  return (
    <View css={{ position: "relative", borderRadius: 10, backgroundColor: Colors.WHITE, boxShadow: "0 3px 6px rgba(0,0,0,.2)" }}>
      {children}
      <TitleSection title={isOthers ? `${createdBy.name}님의 ${title}` : title} onPress={clickHandler} />
      <ContentSection style={{ lineHeight: 1.6, position: "relative" }} onMouseEnter={onHover} onMouseLeave={onLeave}>
        {body}
        <View
          css={{
            position: "absolute",
            bottom: 0,
            right: 0,
            backgroundColor: Colors.PRIMARY,
            borderTopLeftRadius: 10,
            flexDirection: "row",
            columnGap: 10,
            padding: "5px 0",
            width: "0%",
            overflow: "hidden",
            transition: "all .5s ease-out",
          }}
          style={isHovering ? { width: "auto", backgroundColor: Colors.PRIMARY, padding: "5px 10px" } : {}}>
          {isOthers ? (
            <>내거가 아니네요</>
          ) : (
            <>
              <Button css={{ ...buttonStyle }} onClick={onEdit}>
                <Typo size={"SMALL"}>EDIT</Typo>
                <RiEditLine />
              </Button>
              <Button css={{ ...buttonStyle }} onClick={onDone}>
                <Typo size={"SMALL"}>{isDone ? "UNDONE" : "DONE"}</Typo>
                {isDone ? <AiOutlineMinusCircle /> : <RiCheckboxCircleLine />}
              </Button>
              <Button css={{ ...buttonStyle }} onClick={onDelete}>
                <Typo size={"SMALL"}>DELTE</Typo>
                <RiDeleteBack2Line />
              </Button>
            </>
          )}
        </View>
      </ContentSection>
    </View>
  )
}

function Item({
  body,
  createdAt,
  createdBy,
  id,
  title,
  clickHandler,
  children,
  onDelete,
  onDone,
  onEdit,
  isDone,
  isOthers,
  onMetoo,
}: ItemProps & PropsWithChildren) {
  const [isHovering, setIsHovering] = useState(false)
  const onHover = useCallback(() => setIsHovering(true), [])
  const onLeave = useCallback(() => setIsHovering(false), [])
  return (
    <View
      css={{
        padding: 10,
        borderRadius: 10,
        backgroundColor: Colors.WHITE,
        position: "relative",
        cursor: "pointer",
        boxShadow: "0 p3x 6px rgba(0,0,0,.2)",
        "&:hover": {
          boxShadow: "0 3px 6px rgba(0,0,0,.2)",
        },
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}>
      {children}
      <View css={{ flexDirection: "row", justifyContent: "space-between", paddingLeft: 10, alignItems: "center", columnGap: 10 }}>
        <View css={{ flex: 1, flexDirection: "row", columnGap: 20, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} onClick={clickHandler}>
          {isOthers ? `${createdBy.name}님의 ${title}` : title}
          {isDone && (
            <Typo css={{ display: "flex", alignItems: "center", columnGap: 10 }}>
              Done! <RiCheckboxCircleLine />
            </Typo>
          )}
        </View>
        <Typo size="SMALL" color={"GRAY"}>
          {moment(createdAt, momentFormat).fromNow()}
        </Typo>
      </View>

      <View
        css={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "0%",
          overflow: "hidden",
          height: "100%",
          borderRadius: 10,
          transition: "all .5s ease-out",
          flexDirection: "row",
          columnGap: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
        style={isHovering ? { width: "auto", backgroundColor: Colors.PRIMARY, padding: "0 10px" } : {}}>
        {isOthers ? (
          <>
            <Button css={{ ...buttonStyle }} onClick={onMetoo}>
              <Typo css={{ fontSize: 14 }}>오, 나도 할래요!</Typo> <BiPlusCircle />
            </Button>
          </>
        ) : (
          <>
            <Button css={{ ...buttonStyle }} onClick={onEdit}>
              <RiEditLine />
            </Button>
            <Button css={{ ...buttonStyle }} onClick={onDone}>
              {isDone ? <AiOutlineMinusCircle /> : <RiCheckboxCircleLine />}
            </Button>
            <Button css={{ ...buttonStyle }} onClick={onDelete}>
              <RiDeleteBack2Line />
            </Button>
          </>
        )}
      </View>
    </View>
  )
}

const buttonStyle: CSSProperties = {
  padding: 0,
  minHeight: 30,
  color: Colors.WHITE,
  backgroundColor: "transparent",
  border: "none",
  flexDirection: "row",
  columnGap: 5,
}
