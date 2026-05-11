class Footer extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /*html*/ `
        <footer id="footer" class="w-full bg-primary/80 p-5 pb-16 relative">
            <div class="container py-20 text-white text-center space-y-4">
              <p data-reveal>อย่าปล่อยให้ค่าไฟเป็นต้นทุนที่ควบคุมไม่ได้</p>
              <h3 data-reveal data-text-split>เริ่มลดค่าไฟวันนี้ พร้อมรับเงินสนับสนุนสูงสุด 2 ล้านบาท โครงการรับจำนวนจำกัดเพียง 20 แห่งเท่านั้น</h3>
              <a data-reveal href="" class="btn-yellow max-w-fit mx-auto arrow-btn">สมัครเข้าร่วมโครงการ</a>
            </div>
            <div class="container lg:p-12 p-6 bg-white rounded-3xl">
              <section class="flex justify-between flex-wrap gap-8">
                <div class="flex-1 max-lg:min-w-full lg:max-w-86 flex flex-col gap-6">
                  <img src="../images/logo.webp" alt="" class="w-30" width="140" height="44" />
                  <address class="not-italic text-lg">
                    โครงการ Samui Energy Save (1unitSave4baht) เป็นโครงการส่งเสริมการปรับปรุงประสิทธิภาพการใช้พลังงานในพื้นที่เกาะสมุย จังหวัดสุราษฎร์ธานี
                  </address>
                  <p>Samui Energy Save@mail.com</p>
                </div>
                <div class="flex-1 lg:max-w-96  flex flex-col gap-3 text-lg">
                  <p>เมนู</p>
                  <a href="" class="link">หน้าแรก</a>
                  <a href="" class="link">เกี่ยวกับ</a>
                  <a href="" class="link">โครงการ</a>
                  <a href="" class="link">ขั้นตอนเข้าร่วม</a>
                  <a href="" class="link">ข่าวสารและความรู้</a>
                </div>
                <div class="max-lg:flex-1 min-w-32 flex flex-col gap-3 text-lg">
                  <p>โซเชียล</p>
                  <a href="" class="link">Facebook</a>
                  <a href="" class="link">Instagram</a>
                  <a href="" class="link">Threads</a>
                  <a href="" class="link">Pinterest</a>
                </div>
              </section>
              <p class="text-center border-t mt-8 pt-4">Samui Energy Save Ltd. All rights reserved.</p>
            </div>

            <img src="../images/footer-bg.avif" alt="" class=" -z-1 absolute size-full top-0 left-0 object-cover" />
        </footer>
        `;
  }
}

customElements.define("footer-component", Footer);
