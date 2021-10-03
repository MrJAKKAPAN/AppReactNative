import React from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import Svg from "react-native-svg";
import HeaderIcon from "./HeadIcon";
import { CustomText, CustomTextBold } from "../../components/CustomText";

const App = ({ screenHeight, screenWidth, ...props }) => {
  const lineHeight = (screenHeight * screenHeight) / 250000;
  const paperA4Width = (+screenWidth * 4) / 5;
  const paperA4Height = (+paperA4Width * 7) / 5;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ติดต่อทีมงานกองสลาก</Text>
      <View style={styles.blueBox}>
        <View>
          <View style={{ alignItems: "center" }}>
            <Text
              style={[styles.titleInner, { fontFamily: "Anuphan-SemiBold" }]}
            >
              ติดต่อกองสลาก
            </Text>
            <Text style={[styles.textInner, { textAlign: "center" }]}>
              โทรสอบถามหรือสั่งซื้อได้เลย
            </Text>
            <View style={{ margin: 15 }}>
              <HeaderIcon />
            </View>
          </View>

          <Svg
            style={{
              margin: 15,
              height: 100,
              alignSelf: "center",
              backgroundColor: "#f5f5f7",
            }}
            height={lineHeight}
            width={screenWidth}
            backgroundColor="red"
          />

          <View style={{ alignItems: "center", margin: 5 }}>
            <Text
              style={[
                styles.titleInner,
                { fontSize: 24 },
                { fontFamily: "Anuphan-SemiBold" },
              ]}
            >
              เกี่ยวกับกองสลาก{" "}
            </Text>
            <Text style={[styles.textInner]}>
              แหล่งซื้อลอตเตอรี่ที่สะดวกที่สุดในไทย
            </Text>

            <Image
              source={require("../../assets/company.jpg")}
              style={{
                margin: 20,
                borderRadius: 10,
                width: paperA4Width,
                height: paperA4Height,
              }}
            />
          </View>
        </View>
        <CustomText>
          <CustomText>บริษัท ลอตเตอรี่ออนไลน์ จำกัด </CustomText>
          <CustomText>เจ้าของ</CustomText>
          <CustomText>เว็บไซต์ </CustomText>
          <CustomText>กองสลาก.com </CustomText>
          <CustomText>ผู้ให้บริการ</CustomText>
          <CustomText>จำหน่าย,</CustomText>
          <CustomText>จัดเก็บ,</CustomText>
          <CustomText>ขึ้นเงิน</CustomText>
          <CustomText>สลากกินแบ่งรัฐบาล</CustomText>
          <CustomText>(ลอตเตอรี่) </CustomText>
          <CustomText>การันตี</CustomText>
          <CustomText>ความ</CustomText>
          <CustomText>มั่นคง</CustomText>
          <CustomText>ด้วย</CustomText>
          <CustomText>ระบบ</CustomText>
          <CustomText>ที่ดี</CustomText>
          <CustomText>ที่สุด</CustomText>
        </CustomText>

        <CustomTextBold>
          {"\n"}*<CustomTextBold>ซึ่ง</CustomTextBold>
          <CustomTextBold>เรา</CustomTextBold>
          <CustomTextBold>เป็น</CustomTextBold>
          <CustomTextBold>ผู้</CustomTextBold>
          <CustomTextBold>อำนวย</CustomTextBold>
          <CustomTextBold>ความ</CustomTextBold>
          <CustomTextBold>สะดวก</CustomTextBold>
          <CustomTextBold>ขึ้น</CustomTextBold>
          <CustomTextBold>เงิน</CustomTextBold>
          <CustomTextBold>รางวัล</CustomTextBold>
          <CustomTextBold>เท่านั้น</CustomTextBold>
          <CustomTextBold>เรา</CustomTextBold>
          <CustomTextBold>เป็น</CustomTextBold>
          <CustomTextBold>บริษัท</CustomTextBold>
          <CustomTextBold>เอกชน</CustomTextBold>
          <CustomTextBold>ไม่ใช่</CustomTextBold>
          <CustomTextBold>เว็บไซต์</CustomTextBold>
          <CustomTextBold>ของ</CustomTextBold>
          <CustomTextBold>สำนักงาน</CustomTextBold>
          <CustomTextBold>สลาก</CustomTextBold>
          <CustomTextBold>กินแบ่ง</CustomTextBold>
          <CustomTextBold>รัฐบาล</CustomTextBold>
        </CustomTextBold>

        <View style={styles.innerDarkBlueBox}>
          <CustomText style={styles.textInner}>
            <CustomText>หยุด</CustomText>
            <CustomText>เสีย</CustomText>
            <CustomText>โอกาส</CustomText>
            <CustomText>และ</CustomText>
            <CustomText>เวลา </CustomText>
            <CustomText>หมด</CustomText>
            <CustomText>เวลา</CustomText>
            <CustomText>สำหรับ</CustomText>
            <CustomText>การ</CustomText>
            <CustomText>เดิน</CustomText>
            <CustomText>หา</CustomText>
            <CustomText>ซื้อ</CustomText>
            <CustomText>ลอตเตอรี่ </CustomText>
            <CustomText>หมด</CustomText>
            <CustomText>เวลา</CustomText>
            <CustomText>สำหรับ</CustomText>
            <CustomText>การ</CustomText>
            <CustomText>ค้น</CustomText>
            <CustomText>หา</CustomText>
            <CustomText>เลข</CustomText>
            <CustomText>เด็ด</CustomText>
            <CustomText>ที่</CustomText>
            <CustomText>คุณ</CustomText>
            <CustomText>ได้ </CustomText>
            <CustomText>มา</CustomText>
            <CustomText>เรา</CustomText>
            <CustomText>ได้</CustomText>
            <CustomText>พัฒนา</CustomText>
            <CustomText>ระบบ</CustomText>
            <CustomText>ระบบ</CustomText>
            <CustomText>ค้น</CustomText>
            <CustomText>หา</CustomText>
            <CustomText>ลอตเตอรี่</CustomText>
            <CustomText>อัจฉริยะ</CustomText>
            <CustomText>ที่</CustomText>
            <CustomText>คุณ</CustomText>
            <CustomText>สามารถ</CustomText>
            <CustomText>ค้นหา</CustomText>
            <CustomText>เลข</CustomText>
            <CustomText>ที่</CustomText>
            <CustomText>ใช่ </CustomText>
            <CustomText>เลข</CustomText>
            <CustomText>ที่</CustomText>
            <CustomText>ชอบ</CustomText>
            <CustomText>ได้</CustomText>
            <CustomText>อย่าง</CustomText>
            <CustomText>ง่าย</CustomText>
            <CustomText>ดาย</CustomText>
            <CustomText>ด้วย</CustomText>
            <CustomText>ตัวเอง</CustomText>
          </CustomText>
        </View>
        <CustomText>
          <CustomText>เมื่อ</CustomText>
          <CustomText>คุณ</CustomText>
          <CustomText>เลือก</CustomText>
          <CustomText>เลข</CustomText>
          <CustomText>ของ</CustomText>
          <CustomText>คุณ</CustomText>
          <CustomText>และ</CustomText>
          <CustomText>สั่งซื้อ</CustomText>
          <CustomText> “ด้วยตัวเอง”</CustomText>
          <CustomText>แล้ว</CustomText>
          <CustomText>ระบบ</CustomText>
          <CustomText>จะ</CustomText>
          <CustomText>นำ</CustomText>
          <CustomText>ลอตเตอรี่</CustomText>
          <CustomText>ของ</CustomText>
          <CustomText>คุณ</CustomText>
          <CustomText>เข้า</CustomText>
          <CustomText>ระบบ</CustomText>
          <CustomText>“ตู้เซฟ”</CustomText>
          <CustomText>ที่</CustomText>
          <CustomText>ปลอด</CustomText>
          <CustomText>ภัย</CustomText>
          <CustomText>ทันที</CustomText>
          <CustomText>หมด</CustomText>
          <CustomText>กังวล</CustomText>
          <CustomText>ปัญหา</CustomText>
          <CustomText>มิจฉาชีพ</CustomText>
          <CustomText>เข้า</CustomText>
          <CustomText>มา</CustomText>
          <CustomText>หลอกลวง</CustomText>
          <CustomText>เลือก</CustomText>
          <CustomText>เอง</CustomText>
          <CustomText>ซื้อ</CustomText>
          <CustomText>ได้</CustomText>
          <CustomText>เอง</CustomText>
          <CustomText>โดย</CustomText>
          <CustomText>ตรง </CustomText>
          <CustomText>ไม่</CustomText>
          <CustomText>ผ่าน</CustomText>
          <CustomText>ตัว</CustomText>
          <CustomText>กลาง</CustomText>
          <CustomText>ให้</CustomText>
          <CustomText>ปวดหัว</CustomText>
          <CustomText>มั่น</CustomText>
          <CustomText>ใจ</CustomText>
          <CustomText>ได้</CustomText>
          <CustomText>100%</CustomText>
        </CustomText>
        <Text style={[styles.titleInner, { fontSize: 29 }]}>
          {"\n"}
          การันตีความปลอดภัย
          {"\n"}
        </Text>
        <CustomText style={styles.textInner}>
          <CustomText>บริษัท</CustomText>
          <CustomText>ลอตเตอรี่ออนไลน์ </CustomText>
          <CustomText>จำกัด </CustomText>
          <CustomText>(กองสลาก.com) </CustomText>
          <CustomText>กล้า</CustomText>
          <CustomText>รับรอง</CustomText>
          <CustomText>ว่า</CustomText>
          <CustomText>ลอตเตอรี่</CustomText>
          <CustomText>ทุก</CustomText>
          <CustomText>ใบ</CustomText>
          <CustomText>คือ</CustomText>
          <CustomText>ลอตเตอรี่</CustomText>
          <CustomText>ใบ</CustomText>
          <CustomText>จริง</CustomText>
          <CustomText>ที่</CustomText>
          <CustomText>เรา</CustomText>
          <CustomText>ได้</CustomText>
          <CustomText>ทำ</CustomText>
          <CustomText>การ</CustomText>
          <CustomText>อัพโหลด</CustomText>
          <CustomText>สู่</CustomText>
          <CustomText>ระบบ</CustomText>
          <CustomText>คอม</CustomText>
          <CustomText>พิวเตอร์</CustomText>
          <CustomText>ด้วย</CustomText>
          <CustomText>เทคโนโลยี</CustomText>
          <CustomText>ล่าสุด</CustomText>
          <CustomText>ถูก</CustomText>
          <CustomText>เก็บ</CustomText>
          <CustomText>ไว้</CustomText>
          <CustomText>ใน </CustomText>
          <CustomText>Cloud Server</CustomText>
          <CustomText>ที่</CustomText>
          <CustomText>มี</CustomText>
          <CustomText>ความปลอดภัย</CustomText>
          <CustomText>สูงสุด</CustomText>
          {"\n"}
        </CustomText>

        <CustomText>
          <CustomText>โดย</CustomText>
          <CustomText>ลอตเตอรี่</CustomText>
          <CustomText>ใบ</CustomText>
          <CustomText>จริง</CustomText>
          <CustomText>จะ</CustomText>
          <CustomText>ถูก</CustomText>
          <CustomText>เก็บ</CustomText>
          <CustomText>เข้า</CustomText>
          <CustomText>เซฟนิรภัย</CustomText>
          <CustomText>กลาง</CustomText>
          <CustomText>ที่</CustomText>
          <CustomText>บริษัท</CustomText>
          <CustomText>ที่</CustomText>
          <CustomText>มี</CustomText>
          <CustomText>ระบบ</CustomText>
          <CustomText>รักษา</CustomText>
          <CustomText>ความ</CustomText>
          <CustomText>ปลอดภัย</CustomText>
          <CustomText>สูงสุด</CustomText>
          <CustomText>ลอตเตอรี่</CustomText>
          <CustomText>ของคุณ</CustomText>
          <CustomText>ทุกใบ</CustomText>
          <CustomText>จะ</CustomText>
          <CustomText>ไม่มี</CustomText>
          <CustomText>วัน</CustomText>
          <CustomText>สูญหาย</CustomText>
          <CustomText>ตกหล่น</CustomText>
          <CustomText>หรือ</CustomText>
          <CustomText>ถูก</CustomText>
          <CustomText>ขโมย</CustomText>
          <CustomText>จาก</CustomText>
          <CustomText>ใคร</CustomText>
          <CustomText>ไม่</CustomText>
          <CustomText>ว่า</CustomText>
          <CustomText>ครู</CustomText>
          <CustomText>หรือ</CustomText>
          <CustomText>หมวด</CustomText>
          <CustomText>ลอตเตอรี่</CustomText>
          <CustomText>หาย</CustomText>
          <CustomText>จ่าย 2 เท่า!!!</CustomText>
          {"\n"}
        </CustomText>
        <CustomText>
          <CustomText>บริษัทลอตเตอรี่ออนไลน์ จำกัด </CustomText>
          <CustomText>(กองสลาก.com) </CustomText>
          <CustomText>ใช้</CustomText>
          <CustomText>ระบบ</CustomText>
          <CustomText>การซื้อขาย</CustomText>
          <CustomText>นิรภัย</CustomText>
          <CustomText>(ซื้อแล้ว</CustomText>
          <CustomText>ฝาก</CustomText>
          <CustomText>ลอตตอรี่</CustomText>
          <CustomText>ใบจริง</CustomText>
          <CustomText>ไว้</CustomText>
          <CustomText>ใน</CustomText>
          <CustomText>ตู้เซฟนิรภัย</CustomText>
          <CustomText>ของเรา)</CustomText>
          {"\n"}
        </CustomText>
        <CustomText>
          <CustomText>ระบบ</CustomText>
          <CustomText>การซื้อขาย</CustomText>
          <CustomText>นิรภัย</CustomText>
          <CustomText>คือ</CustomText>
          <CustomText>ระบบ</CustomText>
          <CustomText>การซื้อขาย</CustomText>
          <CustomText>สลากกินแบ่งรัฐบาล</CustomText>
          <CustomText> (ลอตเตอรี่)</CustomText>
          <CustomText>ที่</CustomText>
          <CustomText>มี</CustomText>
          <CustomText>ความปลอดภัย</CustomText>
          <CustomText>สูงสุด</CustomText>
          <CustomText>เมื่อ</CustomText>
          <CustomText>ลูกค้า</CustomText>
          <CustomText>สั่งซื้อ</CustomText>
          <CustomText>ลอตเตอรี่</CustomText>
          <CustomText>จาก</CustomText>
          <CustomText>เรา</CustomText>
          <CustomText>ลอตเตอรี่</CustomText>
          <CustomText>ของ</CustomText>
          <CustomText>ลูกค้า</CustomText>
          <CustomText>จะ</CustomText>
          <CustomText>ถูกเก็บ</CustomText>
          <CustomText>อยู่</CustomText>
          <CustomText>ใน</CustomText>
          <CustomText>ห้องนิรภัย</CustomText>
          <CustomText>ที่</CustomText>
          <CustomText>มี</CustomText>
          <CustomText>กล้องวงจรปิด</CustomText>
          <CustomText>ระบบ</CustomText>
          <CustomText>กันขโมย</CustomText>
          <CustomText>และ</CustomText>
          <CustomText>คนดูแล</CustomText>
          <CustomText>ตลอด</CustomText>
          <CustomText>24</CustomText>
          <CustomText> ชั่วโมง</CustomText>
          <CustomText>ตัวลอตเตอรี่</CustomText>
          <CustomText>จะ</CustomText>
          <CustomText>ถูกส่ง</CustomText>
          <CustomText>ถึงมือ</CustomText>
          <CustomText>ลูกค้า</CustomText>
          <CustomText>ต่อเมื่อ</CustomText>
          <CustomText>ลูกค้า</CustomText>
          <CustomText>ถูกรางวัล</CustomText>
          <CustomText>เท่านั้น</CustomText>
          <CustomText>ซึ่ง</CustomText>
          <CustomText>ตรงนี้</CustomText>
          <CustomText>ลูกค้า</CustomText>
          <CustomText>สามารถ</CustomText>
          <CustomText>เลือกได้</CustomText>
          <CustomText>ว่า</CustomText>
          <CustomText>จะ</CustomText>
          <CustomText>รับ</CustomText>
          <CustomText>ลอตเตอรี่</CustomText>
          <CustomText>ไปขึ้นเอง</CustomText>
          <CustomText>หรือ</CustomText>
          <CustomText>จะ</CustomText>
          <CustomText>ให้</CustomText>
          <CustomText>ทางเรา</CustomText>
          <CustomText>บริการ</CustomText>
          <CustomText>ขึ้นรางวัลให้</CustomText>
          <CustomText> "ฟรี</CustomText>"
          <CustomText> ไม่มีค่าธรรมเนียม</CustomText>
          {"\n"}
        </CustomText>

        <CustomText>
          <CustomText style={styles.titleInner}>ขึ้นเงินให้ </CustomText>
          <CustomText style={styles.titleInner}>ไม่มีค่าธรรมเนียม</CustomText>
          {"\n"}
        </CustomText>

        <CustomText>
          <CustomText>กองสลาก.com</CustomText>
          <CustomText> มี</CustomText>
          <CustomText>ระบบ</CustomText>
          <CustomText>การ</CustomText>
          <CustomText>ขึ้นเงิน</CustomText>
          <CustomText>ที่</CustomText>
          <CustomText>รวดเร็ว</CustomText>
          <CustomText>เมื่อ</CustomText>
          <CustomText>ลอตเตอรี่</CustomText>
          <CustomText>ออกรางวัล</CustomText>
          <CustomText>นอกจาก</CustomText>
          <CustomText>ลูกค้า</CustomText>
          <CustomText>ทุกท่าน</CustomText>
          <CustomText>จะ</CustomText>
          <CustomText>สามารถ</CustomText>
          <CustomText>ตรวจ</CustomText>
          <CustomText>ผล</CustomText>
          <CustomText>รางวัล</CustomText>
          <CustomText>ด้วย</CustomText>
          <CustomText>ตัวเอง</CustomText>
          <CustomText>ที่</CustomText>
          <CustomText>หน้าเว็บไซต์</CustomText>
          <CustomText>แล้ว</CustomText>
          <CustomText>เรา</CustomText>
          <CustomText>ยังมี</CustomText>
          <CustomText>ระบบ</CustomText>
          <CustomText>แจ้งเตือน</CustomText>
          <CustomText>เมื่อ</CustomText>
          <CustomText>คุณ</CustomText>
          <CustomText>ถูกลอตเตอรี่</CustomText>
          <CustomText>ทันที</CustomText>
          <CustomText>ด้วย </CustomText>
          <CustomText>sms </CustomText>
          <CustomText>และ</CustomText>
          <CustomText>การ</CustomText>
          <CustomText>แจ้ง</CustomText>
          <CustomText>เตือน</CustomText>
          <CustomText>ผ่าน</CustomText>
          <CustomText>ทางไลน์ </CustomText>
          <CustomText>คุณลูกค้า</CustomText>
          <CustomText>สามารถ</CustomText>
          <CustomText>แจ้ง</CustomText>
          <CustomText>ขึ้นรางวัล</CustomText>
          <CustomText>ได้</CustomText>
          <CustomText>ทันที</CustomText>
          <CustomText>ที่</CustomText>
          <CustomText>ถูก</CustomText>
          <CustomText>รางวัล </CustomText>
          <CustomText>เรากล้า</CustomText>
          <CustomText>การันตี </CustomText>
          <CustomText>หวยออก</CustomText>
          <CustomText>สี่โมง </CustomText>
          <CustomText>เงิน</CustomText>
          <CustomText>เข้า</CustomText>
          <CustomText>บัญชี </CustomText>
          <CustomText>สี่โมงสิบห้า </CustomText>
          <CustomText>ไม่มี</CustomText>
          <CustomText>ค่าธรรมเนียม</CustomText>
          <CustomText>แม้</CustomText>
          <CustomText>แต่บาทเดียว</CustomText>
        </CustomText>

        <View style={styles.innerDarkBlueBox}>
          <CustomTextBold>ซื้อสะดวก หาง่ายดาย เก็บปลอดภัย</CustomTextBold>
          <CustomTextBold>ใส่ใจสังคม</CustomTextBold>
          <CustomTextBold>ลอตเตอรี่ออนไลน์ กองสลาก.com</CustomTextBold>
        </View>

        <CustomText>
          <CustomText>บริษัทลอตเตอรี่ออนไลน์ จำกัด </CustomText>
          <CustomText>(กองสลาก.com) </CustomText>
          <CustomText>บริษัท</CustomText>
          <CustomText>ที่</CustomText>
          <CustomText>จดทะเบียน</CustomText>
          <CustomText>ถูกต้อง</CustomText>
          <CustomText>ตามกฏหมาย</CustomText>
          <CustomText>มี</CustomText>
          <CustomText>ที่อยู่</CustomText>
          <CustomText>ชัดเจน</CustomText>
          <CustomText>ออฟฟิศ</CustomText>
          <CustomText>ของ</CustomText>
          <CustomText>เรา</CustomText>
          <CustomText>ทันสมัย</CustomText>
          <CustomText>ปลอดภัย</CustomText>
          <CustomText>อยู่</CustomText>
          <CustomText>กลางเมือง</CustomText>
          <CustomText>ย่านเอกมัย</CustomText>
          <CustomText>บนตึก</CustomText>
          <CustomText>ที่</CustomText>
          <CustomText>ทันสมัย</CustomText>
          <CustomText>ปลอดภัย</CustomText>
          <CustomText>100%</CustomText>
        </CustomText>
      </View>
    </View>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
  },
  blueBox: {
    padding: 15,
    marginTop: 15,
    paddingTop: 20,
    borderRadius: 7,
    justifyContent: "center",
    backgroundColor: "#0092d2",
  },
  title: {
    fontSize: 22,
    color: "#0b2760",
    textAlign: "center",
    justifyContent: "center",
    fontFamily: "Anuphan-SemiBold",
  },
  titleInner: {
    fontSize: 27,
    color: "#ffff",
    fontFamily: "Anuphan-Regular",
  },
  textInner: {
    fontSize: 18,
    color: "#ffff",
    textAlign: "left",
    fontFamily: "Anuphan-Regular",
  },
  image: {
    margin: 10,
    width: "100%",
    height: "100%",
    borderRadius: 10,
    alignItems: "center",
    resizeMode: "contain",
    justifyContent: "center",
    backgroundColor: "green",
  },
  headerInner: {
    padding: 0,
    margin: -10,
    borderBottomWidth: 2,
    backgroundColor: "red",
    borderBottomColor: "#f5f5f7",
  },
  innerDarkBlueBox: {
    padding: 15,
    marginTop: 20,
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 20,
    borderStyle: "solid",
    borderColor: "#ffff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0775a8",
  },
});
