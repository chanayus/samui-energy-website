class Navbar extends HTMLElement {
  pathname = window.location.pathname ?? "";

  getLinkStyle(path) {
    return path.includes(this.pathname) ? "" : "";
  }

  websitePartList = ["/cookies.html", "/api-documents.html", "/index.html", "/service.html", "/demo.html", "/support.html", "/about-us.html"];

  connectedCallback() {
    this.innerHTML = /*html*/ `
      <nav id="navbar" class="w-full container z-20 fixed lg:top-8 top-4 text-black left-1/2 -translate-x-1/2">
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
      `;
  }
}

customElements.define("navbar-component", Navbar);
