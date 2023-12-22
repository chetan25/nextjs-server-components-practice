// re-exporting the handlers from NextAUth
// this handlers are use by external services to interact with our app
export { handler as GET, handler as POST } from "@/auth";
