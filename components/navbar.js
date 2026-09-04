class Navbar extends HTMLElement {
  pathname = window.location.pathname ?? "";

  getLinkStyle(path) {
    return path.includes(this.pathname) ? "" : "";
  }

  websitePartList = ["/cookies.html", "/api-documents.html", "/index.html", "/service.html", "/demo.html", "/support.html", "/about-us.html"];

  connectedCallback() {
    this.innerHTML = /*html*/ `
      <div id="site-topbar" class="fixed top-0 inset-x-0 z-20 w-full">
        <div id="announcement-bar" class="w-full bg-primary text-white text-xs lg:text-sm">
          <div class="container flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 py-2 text-center">
            <p class="opacity-90">ประกาศรายชื่อผู้ผ่านการคัดเลือก ครั้งที่ 1</p>
            <a href="" class="arrow-btn font-semibold text-amber-300 whitespace-nowrap">ดูรายชื่อ</a>
          </div>
        </div>

        <nav id="navbar" class="w-full container lg:mt-8 mt-4 text-black">
          <div class="bg-white inner lg:px-4 lg:pr-2 px-5 py-2 rounded-full">
             <div class="flex justify-between items-center ">
              <a href="../index.html">
                <img src="../images/logo.webp" class="lg:w-32 w-24" alt="" width="140" height="46" />
              </a>

              <div class="flex gap-x-0.5 max-lg:hidden">
                <a href="../about.html" class="btn">เกี่ยวกับโครงการ</a>
                <a href="../eligibility.html" class="btn">หลักเกณฑ์และเงื่อนไข</a>
                <a href="../blogs.html" class="btn">คลังความรู้และเทคโนโลยี</a>
              </div>

              <button class="btn-primary max-lg:hidden arrow-btn">
                ติดต่อโครงการ
              </button>
              <button class="mobile-nav-toggle lg:hidden" >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>

            <section id="mobile-nav" class="text-lg lg:hidden grid">
              <div class="inner flex flex-col gap-y-4">
                  <a href="../about.html" >เกี่ยวกับโครงการ</a>
                  <a href="../eligibility.html" >หลักเกณฑ์และเงื่อนไข</a>
                  <a href="../blogs.html" >คลังความรู้และเทคโนโลยี</a>
              </div>
            </section>
          </div>
        </nav>
      </div>
      `;
  }
}

customElements.define("navbar-component", Navbar);
