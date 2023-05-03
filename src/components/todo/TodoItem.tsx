import { Button, Colors, momentFormat, Typo, View } from "@/modules"
import { Todo } from "@/types"
import moment from "moment"
import React, { PropsWithChildren, useCallback, useState } from "react"
import { ContentSection, Radio, TitleSection } from "../utils"
import { RiDeleteBack2Line, RiCheckboxCircleLine, RiEditLine } from "react-icons/ri"
import { CSSProperties } from "@stitches/react"
import { usePopup } from "@/context"
import { AddTodoModal } from "./AddTodoModal"

export default function TodoItem(props: Todo) {
  const [isClicked, setIsClicked] = useState(false)
  const clickHandler = useCallback(() => setIsClicked((prev) => !prev), [])

  const { modal } = usePopup()
  const onEdit = useCallback(() => {
    modal(props.title, <AddTodoModal payload={props} />)
  }, [modal])

  const onDone = useCallback(() => console.log("done"), [])
  const onDelete = useCallback(() => console.log("delete"), [])
  return (
    <>
      {isClicked ? (
        <ClickedItem {...props} clickHandler={clickHandler} onEdit={onEdit} onDone={onDone} onDelete={onDelete}>
          <RadioItem clickHandler={clickHandler} isClicked={isClicked} />
        </ClickedItem>
      ) : (
        <Item {...props} clickHandler={clickHandler} onEdit={onEdit} onDone={onDone} onDelete={onDelete}>
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

type ItemProps = { clickHandler: () => void; onEdit: () => void; onDone: () => void; onDelete: () => void } & Todo & PropsWithChildren
function ClickedItem({ body, createdAt, createdBy, id, title, children, clickHandler, onDelete, onDone, onEdit }: ItemProps) {
  const [isHovering, setIsHovering] = useState(false)
  const onHover = useCallback(() => setIsHovering(true), [])
  const onLeave = useCallback(() => setIsHovering(false), [])
  return (
    <View css={{ position: "relative", borderRadius: 10, backgroundColor: Colors.WHITE, boxShadow: "0 p3x 6px rgba(0,0,0,.2)" }}>
      {children}
      <TitleSection title={title} onPress={clickHandler} />
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
          <Button css={{ ...buttonStyle }} onClick={onEdit}>
            <Typo size={"SMALL"}>EDIT</Typo>
            <RiEditLine />
          </Button>
          <Button css={{ ...buttonStyle }}>
            <Typo size={"SMALL"}>DONE</Typo>
            <RiCheckboxCircleLine />
          </Button>
          <Button css={{ ...buttonStyle }}>
            <Typo size={"SMALL"}>DELTE</Typo>
            <RiDeleteBack2Line />
          </Button>
        </View>
      </ContentSection>
    </View>
  )
}

function Item({ body, createdAt, createdBy, id, title, clickHandler, children, onDelete, onDone, onEdit }: ItemProps & PropsWithChildren) {
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
      <View css={{ flexDirection: "row", justifyContent: "space-between", paddingLeft: 10, alignItems: "center" }}>
        <Typo css={{ flex: 1 }} onClick={clickHandler}>
          {title}
        </Typo>
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
        <Button css={{ ...buttonStyle }} onClick={onEdit}>
          <RiEditLine />
        </Button>
        <Button css={{ ...buttonStyle }}>
          <RiCheckboxCircleLine />
        </Button>
        <Button css={{ ...buttonStyle }}>
          <RiDeleteBack2Line />
        </Button>
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
