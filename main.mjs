import fs from "node:fs";
import express from "express";
import { PrismaClient } from "@prisma/client";
import escapeHTML from "escape-html";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("static"));
const prisma = new PrismaClient();

const template = fs.readFileSync("./template.html", "utf-8");
app.get("/", async (request, response) => {
  const posts = await prisma.post.findMany();
  const html = template.replace(
    "<!-- posts -->",
    posts.map((post) => `<li>${escapeHTML(post.message)}</li>`).join(""),
  );
  response.send(html);
});

app.post("/send", async (request, response) => {
  await prisma.post.create({
    data: { message: request.body.message },
  });
  response.redirect("/");
});

app.listen(3000);


function time(){
  var now = new Date();
  var y = now.getFullYear();
  var m = now.getMonth()+1;
  var d = now.getDate();
  var h = now.getHours();
  var i = now.getMinutes();
  var we = new Array("日", "月", "火", "水", "木", "金", "土");
  var w = we[now.getDay()]
  return "   ("+y+"年"+m+"月"+d+"日"+h+"時"+i+"分"+w+"曜日)"
} 