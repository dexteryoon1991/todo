import NextAuth from "next-auth/next"
import GoogleProivder from "next-auth/providers/google"
import KakaoProvider from "next-auth/providers/kakao"
import CredentialsProvider from "next-auth/providers/credentials"
import { AuthOptions } from "next-auth"
import crypto from "crypto"
import { KakaoAccount, Collection } from "@/types"
import { dbService } from "@/lib/firebase"

export const authOptions: AuthOptions = {
  providers: [
    GoogleProivder({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    // CredentialsProvider({
    //   name: "Email",
    //   credentials: {
    //     email: { label: "이메일", type: "email", placeholder: "example@example.com" },
    //     password: { label: "비밀번호", type: "password", placeholder: "6~18자리의 비밀번호" },
    //   },
    //   async authorize(credentials, req) {
    //     const { email, password } = credentials!
    //     const docRef = dbService.collection("credentials").doc(process.env.YOONTECH_UID)
    //     const docSnap = await getDoc(docRef)
    //     const data: any = docSnap.data()
    //     const users = data && data.users ? [...data.users] : []

    //     const foundUser = users.find((user) => user.email === email)
    //     if (!foundUser) {
    //       throw new Error("존재하지 않는 유저입니다.")
    //     }
    //     const isPwdCorrect = await bcrypt.compare(password, foundUser.password)
    //     if (!isPwdCorrect) {
    //       throw new Error("비밀번호가 일치하지 않습니다.")
    //     }

    //     return foundUser
    //   },
    // }),
  ],
  secret: "test",
  pages: {
    error: "/erorr",
    signOut: "/",
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 12 * 60 * 60,
    updateAge: 28 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (profile) {
        const uid = await crypto.randomBytes(16).toString("hex")
        const { kakao_account } = profile as { kakao_account: KakaoAccount }
        let email = ""
        let name = ""
        if (kakao_account) {
          email = kakao_account.email
        } else {
          email = profile.email as string
          name = profile.name as string
        }
        const docRef = dbService.collection(Collection.USER).doc(uid)

        try {
          await docRef.set(name ? { email, name, uid } : { email, uid })
          console.log("new user signed up", { email, uid, name })
        } catch (error: any) {
          throw new Error(error.message)
        }
      }
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {
      console.log(user)
      return { ...session }
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`
      } else if (new URL(url).origin === baseUrl) {
        return baseUrl
      }
      return baseUrl
    },
  },
}

export default NextAuth(authOptions)
