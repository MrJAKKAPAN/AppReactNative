///////// game เลิกใช้ file นี้แล้ว   ( 26-4-64  13:00 น. )/////////

import React from "react";
import Home from "../screens/home";
import Member from "../screens/member";
import Dashboard from "../screens/dashboard";
import Cart from "../screens/cart";
import Contact from "../screens/contact";
import Route from "../routes";

const navbarAll = [
  { name: "Home", component: Home, nameth: "หน้าหลัก" },
  { name: "Member", component: Member, nameth: "สมัครสมาชิก" },
  { name: "Safe", component: Dashboard, nameth: "ตู้เซฟสมาชิก" },
  { name: "Cart", component: Cart, nameth: "ตะกร้า" },
  { name: "Contact", component: Contact, nameth: "ติดต่อเรา" },
];

function Navbar() {
  return (<Route data={navbarAll} />)}
export default Navbar;

///////// game เลิกใช้ file นี้แล้ว  /////////