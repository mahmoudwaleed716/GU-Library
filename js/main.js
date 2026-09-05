/* ==========================================
   GU Library — Main JavaScript
   Version: 1.0
   Last Updated: 2026-08-17
========================================== */

(function() {
  'use strict';

  // ===== Global Settings =====
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ===== Utility Functions =====
  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  // ===== Initialize All Modules =====
  initDustParticles();
  initCorridorPillars();
  initScrollGate();
  initAnkhSearch();
  initRelics();
  initBooks();
  initPortals();
  initStats();
  initTempleExit();
  initTempleTablets();
  initMusic();
  initBackToTop();

  // ==========================================
  // 1. Dust Particles
  // ==========================================
  function initDustParticles() {
    const dustLayer = document.getElementById('dustLayer');
    const MOTE_COUNT = reduceMotion ? 0 : 26;

    if (!dustLayer) return;

    for (let i = 0; i < MOTE_COUNT; i++) {
      const m = document.createElement('div');
      m.className = 'mote';

      const left = Math.random() * 100;
      const dur = 9 + Math.random() * 10;
      const delay = Math.random() * 12;
      const drift = (Math.random() * 40 - 20).toFixed(0) + 'px';

      m.style.left = left + '%';
      m.style.setProperty('--drift', drift);
      m.style.animationDuration = dur + 's';
      m.style.animationDelay = delay + 's';
      m.style.width = m.style.height = (1.5 + Math.random() * 2.2) + 'px';

      dustLayer.appendChild(m);
    }
  }

  // ==========================================
  // 2. Corridor Pillars (Level 1)
  // ==========================================
  function initCorridorPillars() {
    const pillarsRow = document.getElementById('pillarsRow');
    if (!pillarsRow) return;

    const PILLAR_STEPS = 7;
    const pillarEls = [];

    function styleCol(el, leftPct, rightPct, topPct, scale, opacity, bright) {
      el.style.top = topPct + '%';
      if (leftPct !== null) el.style.left = leftPct + '%';
      if (rightPct !== null) el.style.right = rightPct + '%';
      el.style.height = (100 - topPct) + '%';
      el.style.transform = 'scale(' + scale + ')';
      el.style.transformOrigin = 'top center';
      el.style.opacity = opacity;
      el.style.filter = 'brightness(' + bright + ')';
    }

    function addTorch(sidePct, topPct, scale, side) {
      const t = document.createElement('div');
      t.className = 'torch';
      t.style.top = (topPct + 4) + '%';
      t.style[side] = (sidePct + 3) + '%';
      t.style.transform = 'scale(' + Math.max(scale, 0.4) + ')';
      t.innerHTML = '<div class="glow"></div><div class="flame"></div><div class="sconce"></div>';
      pillarsRow.appendChild(t);
    }

    for (let s = 0; s < PILLAR_STEPS; s++) {
      const t = s / (PILLAR_STEPS - 1);
      const scale = lerp(1, 0.22, t);
      const topPct = lerp(6, 34, t);
      const leftPct = lerp(4, 47, t);
      const rightPct = lerp(4, 47, t);
      const opacity = lerp(1, 0.35, t);
      const bright = lerp(1, 0.45, t);

      const left = document.createElement('div');
      left.className = 'p-col';
      styleCol(left, leftPct, null, topPct, scale, opacity, bright);
      pillarsRow.appendChild(left);

      const right = document.createElement('div');
      right.className = 'p-col';
      styleCol(right, null, rightPct, topPct, scale, opacity, bright);
      pillarsRow.appendChild(right);

      if (s % 2 === 0 && s < PILLAR_STEPS - 1) {
        addTorch(leftPct, topPct, scale, 'left');
        addTorch(rightPct, topPct, scale, 'right');
      }

      pillarEls.push({ el: left, t: t });
    }
  }

  // ==========================================
  // 3. Scroll-driven Gate Opening
  // ==========================================
  function initScrollGate() {
    const entrance = document.getElementById('entrance');
    const doorLeft = document.getElementById('doorLeft');
    const doorRight = document.getElementById('doorRight');
    const gateGlow = document.querySelector('.gate-glow');

    if (!entrance || !doorLeft || !doorRight) return;

    let ticking = false;

    function update() {
      ticking = false;

      const rect = entrance.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = clamp((-rect.top) / (rect.height * 0.9), 0, 1);

      if (!reduceMotion) {
        const doorAngleL = lerp(-2, -78, progress);
        const doorAngleR = lerp(2, 78, progress);
        doorLeft.style.transform = 'rotateY(' + doorAngleL + 'deg)';
        doorRight.style.transform = 'rotateY(' + doorAngleR + 'deg)';

        if (gateGlow) {
          gateGlow.style.opacity = lerp(0.9, 0.25, progress);
        }
      }
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    update();
  }

  // ==========================================
  // 4. Ankh Search Form
  // ==========================================
  function initAnkhSearch() {
    const ankhInput = document.getElementById('ankhInput');
    const ankhForm = document.getElementById('ankhForm');
    const entranceTorches = document.querySelectorAll('.torch-entrance-left .flame, .torch-entrance-right .flame');

    if (ankhInput) {
      ankhInput.addEventListener('focus', () => {
        entranceTorches.forEach(f => {
          f.style.animationDuration = '0.9s';
        });
      });

      ankhInput.addEventListener('blur', () => {
        entranceTorches.forEach(f => {
          f.style.animationDuration = '2.6s';
        });
      });
    }

    if (ankhForm && ankhInput) {
      ankhForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = ankhInput.value.trim();

        if (query) {
          window.open(
            'https://library.gu.edu.eg/cgi-bin/koha/opac-search.pl?q=' + encodeURIComponent(query),
            '_blank'
          );
        }
      });
    }
  }

  // ==========================================
  // 5. Relics (Level 2 - Services)
  // ==========================================
  function initRelics() {
    const relics = document.querySelectorAll('.relic-btn');

    function spawnSpark(container) {
      if (reduceMotion) return;

      const spark = document.createElement('span');
      spark.className = 'relic-spark';

      const angle = Math.random() * Math.PI * 2;
      const dist = 26 + Math.random() * 18;

      spark.style.setProperty('--sx', (Math.cos(angle) * dist).toFixed(0) + 'px');
      spark.style.setProperty('--sy', (Math.sin(angle) * dist - 20).toFixed(0) + 'px');
      spark.style.top = '38%';
      spark.style.left = '50%';

      container.appendChild(spark);
      setTimeout(() => spark.remove(), 1000);
    }

    relics.forEach(btn => {
      let sparkTimer = null;

      btn.addEventListener('mouseenter', () => {
        if (reduceMotion) return;
        spawnSpark(btn);
        sparkTimer = setInterval(() => spawnSpark(btn), 450);
      });

      btn.addEventListener('mouseleave', () => {
        if (sparkTimer) {
          clearInterval(sparkTimer);
          sparkTimer = null;
        }
      });

      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-link');
        const bookName = btn.getAttribute('data-book');

        console.log('[GU Library Hub] Relic activated:', bookName, '→', target);

        if (target && target !== '#') {
          window.open(target, '_blank', 'noopener,noreferrer');
        }
      });
    });
  }

  // ==========================================
  // 6. Books (Level 3 - Hall of Stories)
  // ==========================================
  function initBooks() {
    const bookGrid = document.getElementById('bookGrid');
    if (!bookGrid) return;

    const books = [
      { name: "My Living1", img: "book (1).jpg", link: "https://library.gu.edu.eg/cgi-bin/koha/opac-detail.pl?biblionumber=12145" },
      { name: "عظمويل", img: "book (2).jpg", link: "https://library.gu.edu.eg/cgi-bin/koha/opac-detail.pl?biblionumber=9052" },
      { name: "لا تكذب أبداً", img: "book (3).jpg", link: "https://library.gu.edu.eg/cgi-bin/koha/opac-detail.pl?biblionumber=10452" },
      { name: "ياسمين العودة", img: "book (4).jpg", link: "https://library.gu.edu.eg/cgi-bin/koha/opac-detail.pl?biblionumber=10277" },
      { name: "أسفار مريم المحرمة", img: "book (5).jpg", link: "https://library.gu.edu.eg/cgi-bin/koha/opac-detail.pl?biblionumber=10365" },
      { name: "الآلة", img: "book (6).jpg", link: "https://library.gu.edu.eg/cgi-bin/koha/opac-detail.pl?biblionumber=9065" },
      { name: "جزيرة السيدة إليوت", img: "book (7).jpg", link: "https://library.gu.edu.eg/cgi-bin/koha/opac-detail.pl?biblionumber=10259" },
      { name: "اريس بلا إيفل", img: "book (8).jpg", link: "https://library.gu.edu.eg/cgi-bin/koha/opac-detail.pl?biblionumber=9048" },
      { name: "حكايات القبو", img: "book (9).jpg", link: "https://library.gu.edu.eg/cgi-bin/koha/opac-detail.pl?biblionumber=10549" },
      { name: "Adam Bede", img: "book (10).jpg", link: "https://library.gu.edu.eg/cgi-bin/koha/opac-detail.pl?biblionumber=10342" },
      { name: "أوراق شمعون المصري", img: "book (11).jpg", link: "https://library.gu.edu.eg/cgi-bin/koha/opac-detail.pl?biblionumber=10268" },
      { name: "فاتنات أثرن في التاري", img: "book (12).jpg", link: "https://library.gu.edu.eg/cgi-bin/koha/opac-detail.pl?biblionumber=10431" },
      { name: "الحفرة", img: "book (13).jpg", link: "https://library.gu.edu.eg/cgi-bin/koha/opac-detail.pl?biblionumber=10294" },
      { name: "أنا قط", img: "book (14).jpg", link: "https://library.gu.edu.eg/cgi-bin/koha/opac-detail.pl?biblionumber=10263" },
      { name: "حكاية الجارية", img: "book (15).jpg", link: "https://library.gu.edu.eg/cgi-bin/koha/opac-detail.pl?biblionumber=10454" }
    ];

    const fragment = document.createDocumentFragment();

    books.forEach(book => {
      const station = document.createElement('div');
      station.className = 'book-station';

      const btn = document.createElement('button');
      btn.className = 'book-btn';
      btn.setAttribute('data-link', book.link);
      btn.setAttribute('data-book', book.name);

      btn.innerHTML = `
        <div class="book-frame">
          <div class="egypt-rune left-rune"></div>
          <img class="book-cover"
               src="assets/images/books/${book.img}"
               alt="${book.name}"
               loading="lazy"
               decoding="async">
          <div class="egypt-rune right-rune"></div>
          <div class="book-overlay">
            <h3>${book.name}</h3>
            <span>Click to Explore</span>
          </div>
        </div>
      `;

      station.appendChild(btn);
      fragment.appendChild(station);
    });

    bookGrid.appendChild(fragment);
    attachBookEvents();
  }

  function attachBookEvents() {
    const bookButtons = document.querySelectorAll('.book-btn');

    function spawnBookSpark(container) {
      if (reduceMotion) return;

      const spark = document.createElement('span');
      spark.className = 'relic-spark book-spark';

      const angle = Math.random() * Math.PI * 2;
      const dist = 22 + Math.random() * 16;

      spark.style.setProperty('--sx', (Math.cos(angle) * dist).toFixed(0) + 'px');
      spark.style.setProperty('--sy', (Math.sin(angle) * dist - 34).toFixed(0) + 'px');
      spark.style.top = '34%';
      spark.style.left = '50%';

      container.appendChild(spark);
      setTimeout(() => spark.remove(), 1000);
    }
/* =========================================================
   HALL OF STORIES — THREE MOVING SHELF GUARDIANS
========================================================= */

function initShelfGuardians() {

    const bookGrid = document.getElementById('bookGrid');

    if (!bookGrid) return;

    const stations = Array.from(
        bookGrid.querySelectorAll('.book-station')
    );

    if (stations.length !== 15) return;

    /* -----------------------------------------------------
       Guardian SVGs
       3 different Egyptian characters
    ----------------------------------------------------- */

    const guardianSVGs = [

        /* =================================================
           GUARDIAN 1 — ROYAL GUARD
        ================================================= */
        `
        <svg viewBox="0 0 100 145" aria-hidden="true">

            <ellipse
                class="guardian-shadow"
                cx="50"
                cy="137"
                rx="29"
                ry="6"
            />

            <!-- cloak -->
            <path
                class="guardian-dark"
                d="
                M31 64
                Q50 55 69 64
                L78 125
                Q50 137 22 125
                Z"
            />

            <!-- body -->
            <path
                class="guardian-body"
                d="
                M34 63
                Q50 57 66 63
                L70 104
                L30 104
                Z"
            />

            <!-- chest -->
            <path
                class="guardian-gold"
                d="
                M39 70
                L61 70
                L64 96
                L36 96
                Z"
            />

            <!-- head -->
            <circle
                class="guardian-face"
                cx="50"
                cy="43"
                r="16"
            />

            <!-- royal crown -->
            <path
                class="guardian-crown"
                d="
                M35 39
                L37 20
                L44 27
                L50 14
                L56 27
                L63 20
                L65 39
                Z"
            />

            <!-- eyes -->
            <ellipse
                class="guardian-eye"
                cx="44"
                cy="44"
                rx="3"
                ry="2"
            />

            <ellipse
                class="guardian-eye"
                cx="56"
                cy="44"
                rx="3"
                ry="2"
            />

            <!-- beard -->
            <path
                class="guardian-gold"
                d="
                M47 54
                L53 54
                L50 63
                Z"
            />

            <!-- left arm -->
            <path
                class="guardian-body"
                d="
                M34 67
                Q24 76 27 94
                L34 93
                L40 75
                Z"
            />

            <!-- right arm -->
            <path
                class="guardian-body"
                d="
                M66 67
                Q76 76 73 94
                L66 93
                L60 75
                Z"
            />

            <!-- staff -->
            <line
                class="guardian-staff"
                x1="78"
                y1="57"
                x2="78"
                y2="128"
            />

            <path
                class="guardian-gold"
                d="
                M78 57
                Q68 50 78 41
                Q88 50 78 57
                Z"
            />

            <!-- legs -->
            <path
                class="guardian-body"
                d="
                M38 102
                L48 102
                L46 128
                L37 128
                Z"
            />

            <path
                class="guardian-body"
                d="
                M52 102
                L62 102
                L65 128
                L55 128
                Z"
            />

        </svg>
        `,

        /* =================================================
           GUARDIAN 2 — NEMES GUARD
        ================================================= */
        `
        <svg viewBox="0 0 100 145" aria-hidden="true">

            <ellipse
                class="guardian-shadow"
                cx="50"
                cy="137"
                rx="29"
                ry="6"
            />

            <!-- cloak -->
            <path
                class="guardian-dark"
                d="
                M29 65
                Q50 55 71 65
                L77 125
                Q50 137 23 125
                Z"
            />

            <!-- body -->
            <path
                class="guardian-body"
                d="
                M34 64
                Q50 57 66 64
                L70 104
                L30 104
                Z"
            />

            <!-- belt -->
            <path
                class="guardian-gold"
                d="
                M31 94
                L69 94
                L68 102
                L32 102
                Z"
            />

            <!-- head -->
            <circle
                class="guardian-face"
                cx="50"
                cy="43"
                r="15"
            />

            <!-- nemes headdress -->
            <path
                class="guardian-headdress"
                d="
                M34 43
                L31 27
                L39 17
                L50 22
                L61 17
                L69 27
                L66 43
                L61 55
                L56 48
                L50 55
                L44 48
                L39 55
                Z"
            />

            <!-- eyes -->
            <ellipse
                class="guardian-eye"
                cx="44"
                cy="43"
                rx="3"
                ry="2"
            />

            <ellipse
                class="guardian-eye"
                cx="56"
                cy="43"
                rx="3"
                ry="2"
            />

            <!-- necklace -->
            <path
                class="guardian-gold"
                d="
                M39 59
                Q50 67 61 59
                L59 66
                Q50 73 41 66
                Z"
            />

            <!-- arms -->
            <path
                class="guardian-body"
                d="
                M34 68
                Q25 77 28 94
                L35 92
                L40 75
                Z"
            />

            <path
                class="guardian-body"
                d="
                M66 68
                Q75 77 72 94
                L65 92
                L60 75
                Z"
            />

            <!-- staff -->
            <line
                class="guardian-staff"
                x1="23"
                y1="55"
                x2="23"
                y2="128"
            />

            <circle
                class="guardian-gold"
                cx="23"
                cy="52"
                r="5"
            />

            <!-- legs -->
            <path
                class="guardian-body"
                d="
                M38 102
                L48 102
                L45 128
                L36 128
                Z"
            />

            <path
                class="guardian-body"
                d="
                M52 102
                L62 102
                L65 128
                L55 128
                Z"
            />

        </svg>
        `,

        /* =================================================
           GUARDIAN 3 — WARRIOR
        ================================================= */
        `
        <svg viewBox="0 0 100 145" aria-hidden="true">

            <ellipse
                class="guardian-shadow"
                cx="50"
                cy="137"
                rx="29"
                ry="6"
            />

            <!-- cloak -->
            <path
                class="guardian-dark"
                d="
                M30 63
                Q50 55 70 63
                L80 126
                Q50 138 20 126
                Z"
            />

            <!-- body -->
            <path
                class="guardian-body"
                d="
                M34 63
                Q50 57 66 63
                L71 104
                L29 104
                Z"
            />

            <!-- armor -->
            <path
                class="guardian-gold"
                d="
                M38 69
                L62 69
                L67 96
                L33 96
                Z"
            />

            <!-- head -->
            <circle
                class="guardian-face"
                cx="50"
                cy="43"
                r="15"
            />

            <!-- warrior headdress -->
            <path
                class="guardian-headdress"
                d="
                M34 41
                L38 20
                L50 14
                L62 20
                L66 41
                L60 34
                L50 40
                L40 34
                Z"
            />

            <!-- crown tip -->
            <path
                class="guardian-gold"
                d="
                M46 20
                L50 8
                L54 20
                Z"
            />

            <!-- eyes -->
            <ellipse
                class="guardian-eye"
                cx="44"
                cy="43"
                rx="3"
                ry="2"
            />

            <ellipse
                class="guardian-eye"
                cx="56"
                cy="43"
                rx="3"
                ry="2"
            />

            <!-- arm -->
            <path
                class="guardian-body"
                d="
                M34 68
                Q23 75 25 91
                L33 94
                L41 75
                Z"
            />

            <!-- shield -->
            <path
                class="guardian-shield"
                d="
                M23 75
                Q15 82 20 102
                Q23 108 29 102
                Q35 82 27 75
                Z"
            />

            <!-- sword -->
            <line
                class="guardian-staff"
                x1="74"
                y1="56"
                x2="68"
                y2="105"
            />

            <path
                class="guardian-gold"
                d="
                M74 56
                L78 43
                L80 58
                Z"
            />

            <!-- right arm -->
            <path
                class="guardian-body"
                d="
                M66 68
                Q76 76 72 94
                L65 92
                L60 75
                Z"
            />

            <!-- legs -->
            <path
                class="guardian-body"
                d="
                M38 102
                L48 102
                L45 128
                L36 128
                Z"
            />

            <path
                class="guardian-body"
                d="
                M52 102
                L62 102
                L65 128
                L55 128
                Z"
            />

        </svg>
        `
    ];


    /* -----------------------------------------------------
       Create 3 guardians
    ----------------------------------------------------- */

    const guardians = [];

    for (let row = 0; row < 3; row++) {

        const guardian = document.createElement('div');

        guardian.className =
            'shelf-guardian guardian-' + (row + 1) + ' walking';

        guardian.innerHTML = guardianSVGs[row];

        guardian.dataset.row = row;

        bookGrid.appendChild(guardian);

        guardians.push({
            el: guardian,
            row: row,

            direction: row % 2 === 0 ? 1 : -1,

            x: 0,

            minX: 0,
            maxX: 0,

            speed: 0.42 + row * 0.07,

            targetX: null,

            hovering: false,

            rowTop: 0
        });
    }


    /* -----------------------------------------------------
       Find the 3 book rows
    ----------------------------------------------------- */

    function getRows() {

        const rows = [];

        stations.forEach(station => {

            const top = station.offsetTop;

            let row = rows.find(r =>
                Math.abs(r.top - top) < 15
            );

            if (!row) {

                row = {
                    top: top,
                    stations: []
                };

                rows.push(row);
            }

            row.stations.push(station);
        });

        rows.sort((a, b) => a.top - b.top);

        return rows;
    }


    /* -----------------------------------------------------
       Position guardians according to actual book rows
    ----------------------------------------------------- */

    function updateGuardianBounds() {

        const rows = getRows();

        rows.slice(0, 3).forEach((row, index) => {

            const guardian = guardians[index];

            if (!guardian) return;

            const first = row.stations[0];
            const last =
                row.stations[row.stations.length - 1];

            if (!first || !last) return;


            const guardianWidth =
                guardian.el.offsetWidth || 72;


            /*
               Guardian walks underneath / beside the
               books without leaving its shelf.
            */

            guardian.minX =
                Math.max(
                    4,
                    first.offsetLeft - guardianWidth * .15
                );

            guardian.maxX =
                Math.min(
                    bookGrid.clientWidth - guardianWidth - 4,
                    last.offsetLeft +
                    last.offsetWidth -
                    guardianWidth * .8
                );


            guardian.rowTop =
                row.top +
                Math.max(
                    0,
                    row.stations[0].offsetHeight - 15
                );


            /* Initial position */
            if (!guardian.initialized) {

                guardian.x =
                    guardian.direction === 1
                        ? guardian.minX
                        : guardian.maxX;

                guardian.initialized = true;
            }


            guardian.x =
                Math.max(
                    guardian.minX,
                    Math.min(
                        guardian.maxX,
                        guardian.x
                    )
                );


            guardian.el.style.top =
                guardian.rowTop + 'px';

            guardian.el.style.left =
                guardian.x + 'px';
        });
    }


    /* -----------------------------------------------------
       Determine which guardian belongs to a book
    ----------------------------------------------------- */

    function getGuardianForBook(station) {

        const rows = getRows();

        const top = station.offsetTop;

        let rowIndex = 0;

        rows.forEach((row, index) => {

            if (Math.abs(row.top - top) < 15) {
                rowIndex = index;
            }

        });

        return guardians[rowIndex];
    }


    /* -----------------------------------------------------
       Move guardian beside hovered book
    ----------------------------------------------------- */

    stations.forEach(station => {

        const button =
            station.querySelector('.book-btn');

        if (!button) return;


        button.addEventListener('mouseenter', () => {

            const guardian =
                getGuardianForBook(station);

            if (!guardian) return;

            guardian.hovering = true;

            guardian.el.classList.remove('walking');

            guardian.el.classList.add('approaching');


            /*
               Put guardian beside the selected book.
            */

            const bookLeft =
                station.offsetLeft;

            const bookWidth =
                station.offsetWidth;


            /*
               Alternate which side of the book
               the guardian stands on.
            */

            const bookIndex =
                Array.from(stations).indexOf(station);

            const localIndex =
                bookIndex % 5;


            let target;


            if (localIndex < 3) {

                target =
                    bookLeft +
                    bookWidth +
                    8;

            } else {

                target =
                    bookLeft -
                    78;
            }


            target =
                Math.max(
                    guardian.minX,
                    Math.min(
                        guardian.maxX,
                        target
                    )
                );


            guardian.targetX = target;

        });


        button.addEventListener('mouseleave', () => {

            const guardian =
                getGuardianForBook(station);

            if (!guardian) return;

            guardian.hovering = false;

            guardian.targetX = null;

            guardian.el.classList.remove('approaching');

            guardian.el.classList.add('walking');
        });

    });


    /* -----------------------------------------------------
       Main animation loop
    ----------------------------------------------------- */

    let lastTime = performance.now();

    function animateGuardians(now) {

        const delta =
            Math.min(
                now - lastTime,
                40
            );

        lastTime = now;


        guardians.forEach(guardian => {

            if (guardian.hovering &&
                guardian.targetX !== null) {

                /*
                   Smoothly approach selected book.
                */

                const difference =
                    guardian.targetX -
                    guardian.x;


                guardian.x +=
                    difference *
                    Math.min(
                        1,
                        delta * 0.009
                    );


                /*
                   Face the direction of movement.
                */

                if (Math.abs(difference) > 1) {

                    guardian.el.classList.toggle(
                        'face-left',
                        difference < 0
                    );

                    guardian.el.classList.toggle(
                        'face-right',
                        difference >= 0
                    );
                }


            } else {

                /*
                   Normal patrol.
                */

                guardian.x +=
                    guardian.direction *
                    guardian.speed *
                    delta;


                /*
                   Bounce at the edges.
                */

                if (
                    guardian.x >= guardian.maxX
                ) {

                    guardian.x =
                        guardian.maxX;

                    guardian.direction = -1;

                }


                if (
                    guardian.x <= guardian.minX
                ) {

                    guardian.x =
                        guardian.minX;

                    guardian.direction = 1;
                }


                guardian.el.classList.toggle(
                    'face-left',
                    guardian.direction < 0
                );

                guardian.el.classList.toggle(
                    'face-right',
                    guardian.direction > 0
                );
            }


            guardian.el.style.left =
                guardian.x + 'px';
        });


        requestAnimationFrame(
            animateGuardians
        );
    }


    /* -----------------------------------------------------
       Resize
    ----------------------------------------------------- */

    window.addEventListener(
        'resize',
        () => {

            guardians.forEach(g => {
                g.initialized = false;
            });

            updateGuardianBounds();
        },
        { passive: true }
    );


    /* Initial positioning */
    requestAnimationFrame(() => {

        updateGuardianBounds();

        requestAnimationFrame(
            animateGuardians
        );

    });

}
    bookButtons.forEach(btn => {
      let sparkTimer = null;

      btn.addEventListener('mouseenter', () => {
        if (reduceMotion) return;
        spawnBookSpark(btn);
        sparkTimer = setInterval(() => spawnBookSpark(btn), 420);
      });

      btn.addEventListener('mouseleave', () => {
        if (sparkTimer) {
          clearInterval(sparkTimer);
          sparkTimer = null;
        }
      });

      btn.addEventListener('click', () => {
        const ping = document.createElement('span');
        ping.className = 'relic-ping';
        btn.appendChild(ping);
        setTimeout(() => ping.remove(), 750);

        btn.classList.add('is-activated');
        setTimeout(() => btn.classList.remove('is-activated'), 650);

        for (let i = 0; i < 6; i++) {
          spawnBookSpark(btn);
        }

        const target = btn.getAttribute('data-link');
        const bookName = btn.getAttribute('data-book');

        console.log('[GU Library Hub] Book activated:', bookName, '→', target);

        if (target && target !== '#') {
          window.open(target, '_blank', 'noopener,noreferrer');
        }
      });
    });
  }

  // ==========================================
  // 7. Portals (Level 4 - Games Chamber)
  // ==========================================
  function initPortals() {
    const portalGrid = document.getElementById('portalGrid');
    if (!portalGrid) return;

    const PORTALS = [
  {
    id: 'x-and-o',
    label: 'X & O',
    link: 'games/x-and-o.html',
    sound: 'portal-hum-xo',
    type: 'portal-xo',

    rune: `
      <!-- Tic Tac Toe Board -->
      <rect x="29" y="32" width="42" height="42"
            rx="3"
            fill="none"
            stroke="currentColor"
            stroke-width="3"/>

      <path d="M43 32 V74 M57 32 V74
               M29 46 H71 M29 60 H71"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"/>

      <!-- X -->
      <path d="M35 38 L41 44 M41 38 L35 44"
            stroke="currentColor"
            stroke-width="3.2"
            stroke-linecap="round"/>

      <!-- O -->
      <circle cx="64" cy="39" r="4.5"
              fill="none"
              stroke="currentColor"
              stroke-width="3"/>

      <!-- Bottom X -->
      <path d="M49 65 L55 71 M55 65 L49 71"
            stroke="currentColor"
            stroke-width="3.2"
            stroke-linecap="round"/>
    `
  },

  {
    id: 'mummy-runner',
    label: 'Mummy Runner',
    link: 'games/mummy-runner.html',
    sound: 'portal-hum-runner',
    type: 'portal-runner',

    rune: `
      <!-- Mummy Head -->
      <circle cx="52" cy="34" r="9"
              fill="none"
              stroke="currentColor"
              stroke-width="3"/>

      <!-- Mummy Bandages -->
      <path d="
        M45 30 H59
        M44 34 H60
        M44 38 H60
        M47 42 H57"
        fill="none"
        stroke="currentColor"
        stroke-width="2"/>

      <!-- Body -->
      <path d="
        M44 45
        Q52 41 60 45
        L63 67
        Q52 73 41 67
        Z"
        fill="none"
        stroke="currentColor"
        stroke-width="3"/>

      <!-- Body Bandages -->
      <path d="
        M43 50 H61
        M42 56 H62
        M42 62 H62"
        fill="none"
        stroke="currentColor"
        stroke-width="2"/>

      <!-- Running Arm -->
      <path d="
        M44 49 L31 58 L25 51"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"/>

      <!-- Other Arm -->
      <path d="
        M60 49 L70 57 L76 49"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"/>

      <!-- Running Legs -->
      <path d="
        M45 67 L35 81 L27 81
        M58 67 L67 78 L78 78"
        fill="none"
        stroke="currentColor"
        stroke-width="3.5"
        stroke-linecap="round"
        stroke-linejoin="round"/>

      <!-- Motion Lines -->
      <path d="
        M20 72 H31
        M17 79 H28
        M24 86 H35"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"/>
    `
  },

  {
    id: 'chess',
    label: 'Chess',
    link: 'games/chess.html',
    sound: 'portal-hum-chess',
    type: 'portal-chess',

    rune: `
      <!-- Chess Knight -->
      <path d="
        M43 82
        H69
        L65 75
        L58 67
        L61 58
        L59 47
        L52 38
        L43 31
        L38 32
        L42 40
        L37 47
        L40 56
        L35 66
        L31 75
        Z"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linejoin="round"/>

      <!-- Knight Face -->
      <path d="
        M47 42
        L54 45
        L49 48"
        fill="none"
        stroke="currentColor"
        stroke-width="2.4"
        stroke-linecap="round"
        stroke-linejoin="round"/>

      <!-- Eye -->
      <circle cx="50" cy="44" r="1.5"
              fill="currentColor"/>

      <!-- Chess Base -->
      <path d="
        M29 84
        H71
        M33 80 H67"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"/>
    `
  }
];

    const fragment = document.createDocumentFragment();

    PORTALS.forEach(p => {
      const station = document.createElement('div');
      station.className = 'portal-station ' + p.type;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'portal-btn';
      btn.setAttribute('data-portal', p.id);
      btn.setAttribute('data-link', p.link);
      btn.setAttribute('data-sound', p.sound);

      btn.innerHTML = `
        <svg class="portal-figure" viewBox="0 0 100 130">
          <ellipse cx="50" cy="122" rx="34" ry="6" fill="#000" opacity=".35"/>
          <ellipse class="game-icon-frame" cx="50" cy="60" rx="38" ry="45"/>
          <g class="game-symbol" style="color:#e1c577;">
  ${p.rune}
</g>
        </svg>
        <span class="portal-label">${p.label}</span>
      `;

      station.appendChild(btn);
      fragment.appendChild(station);
    });

    portalGrid.appendChild(fragment);
    attachPortalEvents();
  }

  function attachPortalEvents() {
    const portalButtons = document.querySelectorAll('.portal-btn');

    function spawnPortalSpark(container, burst) {
      if (reduceMotion) return;

      const spark = document.createElement('span');
      spark.className = 'portal-spark';

      const angle = Math.random() * Math.PI * 2;
      const dist = burst ? (34 + Math.random() * 26) : (14 + Math.random() * 14);

      spark.style.setProperty('--sx', (Math.cos(angle) * dist).toFixed(0) + 'px');
      spark.style.setProperty('--sy', (Math.sin(angle) * dist - (burst ? 50 : 26)).toFixed(0) + 'px');
      spark.style.top = '46%';
      spark.style.left = '50%';

      container.appendChild(spark);
      setTimeout(() => spark.remove(), 1450);
    }

    portalButtons.forEach(btn => {
      let hoverTimer = null;

      // Ambient particles
      const ambientTimer = reduceMotion ? null : setInterval(() => {
        spawnPortalSpark(btn, false);
      }, 900 + Math.random() * 500);

      btn.addEventListener('mouseenter', () => {
        if (reduceMotion) return;
        spawnPortalSpark(btn, true);
        hoverTimer = setInterval(() => spawnPortalSpark(btn, true), 260);
      });

      btn.addEventListener('mouseleave', () => {
        if (hoverTimer) {
          clearInterval(hoverTimer);
          hoverTimer = null;
        }
      });

      btn.addEventListener('click', () => {
        const ping = document.createElement('span');
        ping.className = 'relic-ping';
        btn.appendChild(ping);
        setTimeout(() => ping.remove(), 750);

        btn.classList.add('is-activated');
        setTimeout(() => btn.classList.remove('is-activated'), 650);

        for (let i = 0; i < 8; i++) {
          spawnPortalSpark(btn, true);
        }

        const target = btn.getAttribute('data-link');
        const portalName = btn.getAttribute('data-portal');
        const soundId = btn.getAttribute('data-sound');

        console.log('[GU Library Hub] Portal activated:', portalName, '→', target, '| sound:', soundId);

        if (target && target !== '#') {
          window.location.href = target;
        }
      });
    });
  }

  // ==========================================
  // 8. Statistics (Level 5 - Student Hall)
  // ==========================================
  function initStats() {
    const statCards = document.querySelectorAll('.stat-card');
    if (!statCards.length) return;

    function animateCount(el, target, duration) {
      if (reduceMotion) {
        el.textContent = target.toLocaleString();
        return;
      }

      let start = null;

      function step(ts) {
        if (start === null) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target).toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target.toLocaleString();
        }
      }

      requestAnimationFrame(step);
    }

    const statObserver = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          const card = en.target;
          card.classList.add('visible');

          const target = parseInt(card.getAttribute('data-target'), 10) || 0;
          const numberEl = card.querySelector('.stat-number');

          if (numberEl && !card.dataset.counted) {
            card.dataset.counted = 'true';
            animateCount(numberEl, target, 1800);
          }

          statObserver.unobserve(card);
        }
      });
    }, { threshold: 0.4 });

    statCards.forEach(card => statObserver.observe(card));
  }

  // ==========================================
  // 9. Temple Exit (Closing Gate)
  // ==========================================
  function initTempleExit() {
    const templeExit = document.getElementById('templeExit');
    const exitDoorLeft = document.getElementById('exitDoorLeft');
    const exitDoorRight = document.getElementById('exitDoorRight');
    const exitGateGlow = document.getElementById('exitGateGlow');
    const exitFarewell = document.getElementById('exitFarewell');

    if (!templeExit) return;

    let exitTicking = false;

    function updateExit() {
      exitTicking = false;

      const rect = templeExit.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = clamp((vh * 0.85 - rect.top) / (rect.height * 0.55), 0, 1);

      if (!reduceMotion) {
        const angleL = lerp(-78, 0, progress);
        const angleR = lerp(78, 0, progress);

        if (exitDoorLeft) exitDoorLeft.style.transform = 'rotateY(' + angleL + 'deg)';
        if (exitDoorRight) exitDoorRight.style.transform = 'rotateY(' + angleR + 'deg)';
        if (exitGateGlow) exitGateGlow.style.opacity = lerp(0.9, 0.15, progress);
      } else {
        if (exitDoorLeft) exitDoorLeft.style.transform = 'rotateY(0deg)';
        if (exitDoorRight) exitDoorRight.style.transform = 'rotateY(0deg)';
      }

      if (progress > 0.45 && exitFarewell) {
        exitFarewell.classList.add('visible');
      }
    }

    function onExitScroll() {
      if (!exitTicking) {
        requestAnimationFrame(updateExit);
        exitTicking = true;
      }
    }

    window.addEventListener('scroll', onExitScroll, { passive: true });
    updateExit();
  }

  // ==========================================
  // 10. Temple Tablets (Quick Actions)
  // ==========================================
  function initTempleTablets() {
    const tablets = document.querySelectorAll('.temple-tablet');

    function spawnTempleSpark(container, teal) {
      if (reduceMotion) return;

      const spark = document.createElement('span');
      spark.className = teal ? 'temple-spark teal' : 'temple-spark';

      const angle = Math.random() * Math.PI * 2;
      const dist = 30 + Math.random() * 30;

      spark.style.setProperty('--sx', (Math.cos(angle) * dist).toFixed(0) + 'px');
      spark.style.setProperty('--sy', (Math.sin(angle) * dist - 30).toFixed(0) + 'px');
      spark.style.top = '40%';
      spark.style.left = '50%';

      container.appendChild(spark);
      setTimeout(() => spark.remove(), 950);
    }

    tablets.forEach(btn => {
      let sparkTimer = null;

      btn.addEventListener('mouseenter', () => {
        if (reduceMotion) return;
        spawnTempleSpark(btn, false);
        sparkTimer = setInterval(() => {
          spawnTempleSpark(btn, Math.random() > 0.6);
        }, 420);
      });

      btn.addEventListener('mouseleave', () => {
        if (sparkTimer) {
          clearInterval(sparkTimer);
          sparkTimer = null;
        }
      });

      btn.addEventListener('click', () => {
        const ripple = document.createElement('span');
        ripple.className = 'temple-tablet-ripple';
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 750);

        const flash = document.createElement('span');
        flash.className = 'temple-tablet-flash';
        btn.appendChild(flash);
        setTimeout(() => flash.remove(), 550);

        btn.classList.add('is-clicked');
        setTimeout(() => btn.classList.remove('is-clicked'), 220);

        for (let i = 0; i < 7; i++) {
          spawnTempleSpark(btn, i % 2 === 0);
        }

        const link = btn.getAttribute('data-link');
        if (link && link !== '#') {
          window.open(link, '_blank', 'noopener,noreferrer');
        }
      });
    });
  }

  // ==========================================
  // 11. Music Control
  // ==========================================
  function initMusic() {
    const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById("mainMusicBtn");

    if (!music || !musicBtn) return;

    music.volume = 0.25;
    let playing = false;

    musicBtn.addEventListener('click', async () => {
      try {
        if (!playing) {
          await music.play();
          musicBtn.setAttribute('aria-pressed', 'true');
          musicBtn.setAttribute('aria-label', 'Pause temple music');
          musicBtn.querySelector('.music-text').textContent = 'Pause Music';
          musicBtn.querySelector('.music-icon').textContent = '🔊';
          playing = true;
        } else {
          music.pause();
          musicBtn.setAttribute('aria-pressed', 'false');
          musicBtn.setAttribute('aria-label', 'Play temple music');
          musicBtn.querySelector('.music-text').textContent = 'Temple Music';
          musicBtn.querySelector('.music-icon').textContent = '🔇';
          playing = false;
        }
      } catch (error) {
        console.error('Music could not be played:', error);
      }
    });
  }

  // ==========================================
  // 12. Back to Top Button
  // ==========================================
  function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 600) {
        backToTop.hidden = false;
      } else {
        backToTop.hidden = true;
      }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

})();
/* =========================================================
   TEMPLE RELIC INTERACTION ENGINE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".relic-grid > *");

    if (!cards.length) return;


    cards.forEach((card, index) => {

        /* -----------------------------------------
           SHIMMER
        ----------------------------------------- */

        const shimmer = document.createElement("span");
        shimmer.className = "card-shimmer";

        card.appendChild(shimmer);


        /* -----------------------------------------
           MOUSE LIGHT
        ----------------------------------------- */

        const light = document.createElement("span");
        light.className = "card-light";

        card.appendChild(light);


        /* -----------------------------------------
           MOUSE MOVEMENT
           حركة بسيطة جدًا مش 3D مبالغ فيها
        ----------------------------------------- */

        card.addEventListener("mousemove", (event) => {

            const rect = card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const percentX = (x / rect.width) * 100;
            const percentY = (y / rect.height) * 100;

            card.style.setProperty(
                "--mouse-x",
                `${percentX}%`
            );

            card.style.setProperty(
                "--mouse-y",
                `${percentY}%`
            );


            /* subtle tilt */

            const rotateX =
                ((y / rect.height) - 0.5) * -2;

            const rotateY =
                ((x / rect.width) - 0.5) * 2;

            card.style.transform = `
                translateY(calc(var(--card-y) - 10px))
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale(1.035)
            `;
        });


        /* -----------------------------------------
           RETURN TO NORMAL
        ----------------------------------------- */

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

            card.style.setProperty(
                "--mouse-x",
                "50%"
            );

            card.style.setProperty(
                "--mouse-y",
                "50%"
            );
        });


        /* -----------------------------------------
           STAGGERED ENTRANCE
        ----------------------------------------- */

        card.style.setProperty(
            "--relic-delay",
            `${index * 120}ms`
        );

    });


    /* =====================================================
       SMALL TEMPLE ENERGY PARTICLES
       تظهر فقط أثناء دخول الكروت
    ===================================================== */

    const grid = document.querySelector(".relic-grid");

    if (grid) {

        grid.classList.add("relics-awakened");

        cards.forEach((card, index) => {

            setTimeout(() => {

                card.classList.add("relic-awaken");

                setTimeout(() => {
                    card.classList.remove("relic-awaken");
                }, 900);

            }, index * 140);

        });
    }

});
// ==========================================
// 5. Relics — Living Temple Interaction
// ==========================================
function initRelics() {

  const relics = document.querySelectorAll('.relic-btn');

  if (!relics.length) return;

  relics.forEach(btn => {

    let sparkTimer = null;

    /* ---------------------------------------
       Mouse movement — cinematic 3D
    --------------------------------------- */

    btn.addEventListener('mousemove', (e) => {

      if (reduceMotion) return;

      const rect = btn.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const px = x / rect.width;
      const py = y / rect.height;

      const rotateY = (px - 0.5) * 10;
      const rotateX = (0.5 - py) * 8;

      btn.style.setProperty(
        '--card-rx',
        rotateX.toFixed(2) + 'deg'
      );

      btn.style.setProperty(
        '--card-ry',
        rotateY.toFixed(2) + 'deg'
      );

      btn.classList.add('is-mouse-active');
    });


    /* ---------------------------------------
       Mouse leaves
    --------------------------------------- */

    btn.addEventListener('mouseleave', () => {

      btn.style.setProperty(
        '--card-rx',
        '0deg'
      );

      btn.style.setProperty(
        '--card-ry',
        '0deg'
      );

      btn.classList.remove('is-mouse-active');

      if (sparkTimer) {
        clearInterval(sparkTimer);
        sparkTimer = null;
      }
    });


    /* ---------------------------------------
       Sparks
    --------------------------------------- */

    function spawnSpark() {

      if (reduceMotion) return;

      const spark = document.createElement('span');

      spark.className = 'relic-spark';

      const angle =
        Math.random() * Math.PI * 2;

      const distance =
        25 + Math.random() * 35;

      spark.style.setProperty(
        '--sx',
        (Math.cos(angle) * distance).toFixed(0) + 'px'
      );

      spark.style.setProperty(
        '--sy',
        (Math.sin(angle) * distance - 25).toFixed(0) + 'px'
      );

      spark.style.left = '50%';
      spark.style.top = '42%';

      btn.appendChild(spark);

      setTimeout(() => {
        spark.remove();
      }, 1000);
    }


    /* ---------------------------------------
       Hover = artifact wakes up
    --------------------------------------- */

    btn.addEventListener('mouseenter', () => {

      if (reduceMotion) return;

      spawnSpark();

      sparkTimer = setInterval(() => {

        spawnSpark();

      }, 550);

    });


    /* ---------------------------------------
       Click = temple activation
    --------------------------------------- */

    btn.addEventListener('click', () => {

      btn.classList.add('is-activated');

      setTimeout(() => {

        btn.classList.remove('is-activated');

      }, 650);


      /* burst */

      for (let i = 0; i < 10; i++) {
        spawnSpark();
      }


      const target =
        btn.getAttribute('data-link');

      const relicName =
        btn.getAttribute('data-relic');


      console.log(
        '[GU Library Hub] Relic activated:',
        relicName,
        '→',
        target
      );


      if (target && target !== '#') {

        window.open(
          target,
          '_blank',
          'noopener,noreferrer'
        );

      }

    });

  });

}
/* =========================================================
   GU LIBRARY — KNOWLEDGE GUARDIAN
   FULL SCREEN TEMPLE PATROL
   ========================================================= */

(() => {

    function initKnowledgeGuardian() {

        const guardian =
            document.getElementById("knowledgeGuardian");

        if (!guardian) {
            console.warn(
                "Knowledge Guardian was not found."
            );
            return;
        }


        /* =====================================================
           SETTINGS
        ===================================================== */

        const SPEED = 45;

        const STOP_TIME = 3500;

        const START_DELAY = 2000;

        const EDGE_MARGIN = 25;


        /* =====================================================
           STATE
        ===================================================== */

        let direction = -1;

        let position = 0;

        let walking = false;

        let stoppedUntil = 0;

        let lastTime =
            performance.now();


        /* =====================================================
           MAKE SURE OLD MOVEMENT DOES NOT INTERFERE
        ===================================================== */

        guardian.style.animation = "none";

        guardian.style.translate = "0 0";

        guardian.style.left = "";

        guardian.style.right = "";


        /* =====================================================
           GET FULL SCREEN LIMITS
        ===================================================== */

        function getLimits() {

            const width =
                guardian.getBoundingClientRect().width;


            const halfScreen =
                window.innerWidth / 2;


            return {

                min:
                    -halfScreen +
                    width / 2 +
                    EDGE_MARGIN,

                max:
                    halfScreen -
                    width / 2 -
                    EDGE_MARGIN

            };

        }


        /* =====================================================
           FACE DIRECTION
        ===================================================== */

        function updateFace() {

            const svg =
                guardian.querySelector(
                    ".guardian-svg"
                );

            if (!svg) return;


            /*
               scale بدل transform
               عشان ما نمسحش animations
               الموجودة على الـ SVG
            */

            svg.style.scale =
                direction === -1
                    ? "-1 1"
                    : "1 1";

        }


        /* =====================================================
           STATE
        ===================================================== */

        function setWalking(state) {

            walking = state;

            guardian.classList.toggle(
                "guardian-walking",
                state
            );

            guardian.classList.toggle(
                "guardian-idle",
                !state
            );

        }


        /* =====================================================
           PATROL ENGINE
        ===================================================== */

        function patrol(time) {

            const delta =
                Math.min(
                    (time - lastTime) / 1000,
                    0.05
                );

            lastTime = time;


            const limits =
                getLimits();


            /* ===============================================
               LEFT / RIGHT EDGE
            =============================================== */

            if (
                position <= limits.min ||
                position >= limits.max
            ) {

                position =
                    Math.max(
                        limits.min,
                        Math.min(
                            limits.max,
                            position
                        )
                    );


                if (walking) {

                    setWalking(false);

                    stoppedUntil =
                        time + STOP_TIME;

                }


                if (
                    !walking &&
                    time >= stoppedUntil
                ) {

                    direction *= -1;

                    updateFace();

                    setWalking(true);

                }

            }


            /* ===============================================
               WALK
            =============================================== */

            if (walking) {

                position +=
                    direction *
                    SPEED *
                    delta;

            }


            /* ===============================================
               MOVE CHARACTER
            =============================================== */

            guardian.style.translate =
                `${position}px 0`;


            requestAnimationFrame(
                patrol
            );

        }


        /* =====================================================
           INITIAL POSITION
        ===================================================== */

        position = 0;

        direction = -1;

        guardian.style.translate =
            "0 0";

        updateFace();

        setWalking(false);


        /* =====================================================
           START
        ===================================================== */

        setTimeout(() => {

            setWalking(true);

        }, START_DELAY);


        requestAnimationFrame(
            patrol
        );


        /* =====================================================
           RESIZE
        ===================================================== */

        window.addEventListener(
            "resize",
            () => {

                const limits =
                    getLimits();


                position =
                    Math.max(
                        limits.min,
                        Math.min(
                            limits.max,
                            position
                        )
                    );

            }
        );

    }


    /* =========================================================
       START AFTER PAGE LOAD
    ========================================================= */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initKnowledgeGuardian
        );

    } else {

        initKnowledgeGuardian();

    }

})();
/* =========================================================
   HALL OF STORIES
   3 MINI EGYPTIAN GUARDIANS
   One Guardian for each shelf
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const bookGrid = document.getElementById("bookGrid");

    if (!bookGrid) {
        console.warn("bookGrid not found");
        return;
    }

    /*
       Wait until the 15 books are generated
    */
    setTimeout(() => {

        const books = Array.from(
            bookGrid.querySelectorAll(".book-station")
        );

        console.log("Hall of Stories books:", books.length);

        if (books.length < 15) {
            console.warn("15 books were not found yet.");
            return;
        }

        /* =========================================
           CREATE 3 GUARDIANS
        ========================================= */

        const guardianData = [
            {
                name: "royal",
                symbol: "𓂀"
            },
            {
                name: "pharaoh",
                symbol: "𓁶"
            },
            {
                name: "warrior",
                symbol: "𓆣"
            }
        ];

        const guardians = [];

        guardianData.forEach((data, index) => {

            const guardian =
                document.createElement("div");

            guardian.className =
                `mini-shelf-guardian guardian-${index + 1}`;

            guardian.innerHTML = `
                <div class="guardian-body">

                    <div class="guardian-head">
                        ${data.symbol}
                    </div>

                    <div class="guardian-crown"></div>

                    <div class="guardian-torso"></div>

                    <div class="guardian-arm left"></div>
                    <div class="guardian-arm right"></div>

                    <div class="guardian-leg left"></div>
                    <div class="guardian-leg right"></div>

                    <div class="guardian-staff"></div>

                </div>
            `;

            bookGrid.appendChild(guardian);

            guardians.push({
                element: guardian,
                row: index,
                direction: index % 2 === 0 ? 1 : -1,
                position: 0,
                target: null,
                hovering: false
            });

        });


        /* =========================================
           FIND THE 3 ROWS
        ========================================= */

        function getRows() {

            const rows = [];

            books.forEach(book => {

                const top = book.offsetTop;

                let row =
                    rows.find(
                        r => Math.abs(r.top - top) < 20
                    );

                if (!row) {

                    row = {
                        top: top,
                        books: []
                    };

                    rows.push(row);
                }

                row.books.push(book);

            });

            rows.sort(
                (a, b) => a.top - b.top
            );

            return rows;

        }


        /* =========================================
           POSITION GUARDIANS
        ========================================= */

        function positionGuardians() {

            const rows = getRows();

            rows.slice(0, 3).forEach(
                (row, rowIndex) => {

                    const guardian =
                        guardians[rowIndex];

                    if (!guardian) return;

                    const firstBook =
                        row.books[0];

                    const lastBook =
                        row.books[row.books.length - 1];

                    if (!firstBook || !lastBook)
                        return;


                    guardian.min =
                        firstBook.offsetLeft - 25;

                    guardian.max =
                        lastBook.offsetLeft +
                        lastBook.offsetWidth -
                        35;


                    guardian.top =
                        row.top +
                        firstBook.offsetHeight -
                        40;


                    /*
                       Initial positions
                    */

                    if (!guardian.started) {

                        guardian.position =
                            guardian.direction === 1
                                ? guardian.min
                                : guardian.max;

                        guardian.started = true;
                    }


                    guardian.element.style.top =
                        guardian.top + "px";

                    guardian.element.style.left =
                        guardian.position + "px";

                }
            );

        }


        /* =========================================
           BOOK HOVER
        ========================================= */

        books.forEach((book, bookIndex) => {

            const button =
                book.querySelector(".book-btn");

            if (!button) return;


            button.addEventListener(
                "mouseenter",
                () => {

                    /*
                       0-4   = guardian 1
                       5-9   = guardian 2
                       10-14 = guardian 3
                    */

                    const rowIndex =
                        Math.floor(bookIndex / 5);

                    const guardian =
                        guardians[rowIndex];

                    if (!guardian) return;


                    guardian.hovering = true;


                    /*
                       Move beside the book
                    */

                    const bookCenter =
                        book.offsetLeft +
                        book.offsetWidth / 2;


                    guardian.target =
                        bookCenter -
                        35;


                    /*
                       Keep inside shelf
                    */

                    guardian.target =
                        Math.max(
                            guardian.min,
                            Math.min(
                                guardian.max,
                                guardian.target
                            )
                        );


                    guardian.element.classList.add(
                        "guardian-following"
                    );

                }
            );


            button.addEventListener(
                "mouseleave",
                () => {

                    const rowIndex =
                        Math.floor(bookIndex / 5);

                    const guardian =
                        guardians[rowIndex];

                    if (!guardian) return;


                    guardian.hovering = false;

                    guardian.target = null;

                    guardian.element.classList.remove(
                        "guardian-following"
                    );

                }
            );

        });


        /* =========================================
           ANIMATION
        ========================================= */

        function animate() {

            guardians.forEach(
                guardian => {

                    if (
                        guardian.hovering &&
                        guardian.target !== null
                    ) {

                        const difference =
                            guardian.target -
                            guardian.position;


                        guardian.position +=
                            difference * 0.06;


                    } else {

                        /*
                           Normal patrol
                        */

                        guardian.position +=
                            guardian.direction *
                            0.40;


                        if (
                            guardian.position >=
                            guardian.max
                        ) {

                            guardian.position =
                                guardian.max;

                            guardian.direction = -1;

                        }


                        if (
                            guardian.position <=
                            guardian.min
                        ) {

                            guardian.position =
                                guardian.min;

                            guardian.direction = 1;

                        }

                    }


                    guardian.element.style.left =
                        guardian.position + "px";


                    /*
                       Face movement direction
                    */

                    if (
                        guardian.direction < 0
                    ) {

                        guardian.element.style.transform =
                            "scaleX(-1)";

                    } else {

                        guardian.element.style.transform =
                            "scaleX(1)";

                    }

                }
            );


            requestAnimationFrame(animate);

        }


        /* =========================================
           START
        ========================================= */

        positionGuardians();

        animate();


        window.addEventListener(
            "resize",
            positionGuardians
        );


        console.log(
            "✓ 3 Shelf Guardians activated"
        );

    }, 500);

});
/* =========================================================
   GU LIBRARY — GAMES CHAMBER
   DYNAMIC EYE OF HORUS TRACKING
   ========================================================= */

(function () {

    const chamber =
        document.querySelector(".games-chamber");

    if (!chamber) return;

    const grid =
        chamber.querySelector(".portal-grid");

    if (!grid) return;


    const games =
        Array.from(
            grid.querySelectorAll(".portal-station")
        );

    if (!games.length) return;


    /*
     * Eye movement is based on REAL positions.
     *
     * The eye always moves to the midpoint
     * between the chamber center and the
     * hovered game.
     */

    games.forEach(game => {

        game.addEventListener("mouseenter", () => {

            const gridRect =
                grid.getBoundingClientRect();

            const gameRect =
                game.getBoundingClientRect();


            /* Grid center */

            const centerX =
                gridRect.left +
                gridRect.width / 2;

            const centerY =
                gridRect.top +
                gridRect.height / 2;


            /* Game center */

            const gameX =
                gameRect.left +
                gameRect.width / 2;

            const gameY =
                gameRect.top +
                gameRect.height / 2;


            /*
             * Midpoint between center
             * and game.
             */

            const eyeX =
                centerX +
                (gameX - centerX) * 0.52;

            const eyeY =
                centerY +
                (gameY - centerY) * 0.52;


            /*
             * Convert screen coordinates
             * to grid percentages.
             */

            const x =
                ((eyeX - gridRect.left) /
                gridRect.width) * 100;

            const y =
                ((eyeY - gridRect.top) /
                gridRect.height) * 100;


            grid.style.setProperty(
                "--eye-x",
                `${x}%`
            );

            grid.style.setProperty(
                "--eye-y",
                `${y}%`
            );

        });

    });


    /*
     * Return the eye to the exact
     * geometric center.
     */

    grid.addEventListener("mouseleave", () => {

        grid.style.setProperty(
            "--eye-x",
            "50%"
        );

        grid.style.setProperty(
            "--eye-y",
            "49%"
        );

    });

})();
/* =========================================================
   SERPENT REACTS TO GAME CARDS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const chamber = document.querySelector(".games-chamber");

    if (!chamber) return;

    const gameCards = chamber.querySelectorAll(
        ".game-card, .portal-card, .game-portal, [class*='game-card']"
    );

    gameCards.forEach(card => {

        card.addEventListener("mouseenter", () => {
            chamber.classList.add("serpent-alert");
        });

        card.addEventListener("mouseleave", () => {
            chamber.classList.remove("serpent-alert");
        });

    });

});
/* ============================================================
   PHARAONIC LIBRARY ARCHITECTURE
   Decorative environment only
   Does NOT modify books or guardians
   ============================================================ */

(function buildLibraryArchitecture() {

    const grid = document.getElementById("bookGrid");

    if (!grid) return;

    /* منع التكرار */
    if (grid.querySelector(".library-architecture")) return;


    /* ========================================================
       الحاوية
       ======================================================== */

    const architecture = document.createElement("div");

    architecture.className = "library-architecture";

    architecture.innerHTML = `

        <!-- LEFT OBELISK -->
        <div class="library-obelisk library-obelisk-left">
            <div class="obelisk-cap">𓇳</div>
            <div class="obelisk-body">
                <span>𓂀</span>
                <span>𓋹</span>
                <span>𓆣</span>
                <span>𓊹</span>
            </div>
            <div class="obelisk-base"></div>
        </div>


        <!-- RIGHT OBELISK -->
        <div class="library-obelisk library-obelisk-right">
            <div class="obelisk-cap">𓇳</div>
            <div class="obelisk-body">
                <span>𓂀</span>
                <span>𓋹</span>
                <span>𓆣</span>
                <span>𓊹</span>
            </div>
            <div class="obelisk-base"></div>
        </div>


        <!-- ROW SHELVES -->

        <div class="library-shelf shelf-1">
            <div class="shelf-gold-line"></div>
            <div class="shelf-carving">𓆣　𓋹　𓆣</div>
        </div>

        <div class="library-shelf shelf-2">
            <div class="shelf-gold-line"></div>
            <div class="shelf-carving">𓂀　𓇳　𓂀</div>
        </div>

        <div class="library-shelf shelf-3">
            <div class="shelf-gold-line"></div>
            <div class="shelf-carving">𓆣　𓋹　𓆣</div>
        </div>


        <!-- PYRAMID AREA -->

        <div class="library-finale">

            <div class="finale-stars">
                𓇳　𓂀　𓋹　𓂀　𓇳
            </div>

            <div class="pyramid pyramid-back"></div>

            <div class="pyramid pyramid-left"></div>

            <div class="pyramid pyramid-right"></div>

            <div class="finale-inscription">
                𓂀
            </div>

        </div>

    `;

    grid.prepend(architecture);

})();
/* ============================================================
   ALIGN SHELVES WITH GUARDIAN FEET
   ============================================================ */

function alignLibraryShelves() {

    const grid = document.getElementById("bookGrid");

    if (!grid) return;

    const guardians = [
        grid.querySelector(".shelf-guardian:nth-of-type(1)"),
        grid.querySelector(".shelf-guardian:nth-of-type(2)"),
        grid.querySelector(".shelf-guardian:nth-of-type(3)")
    ];

    const shelves = [
        grid.querySelector(".library-shelf.shelf-1"),
        grid.querySelector(".library-shelf.shelf-2"),
        grid.querySelector(".library-shelf.shelf-3")
    ];

    guardians.forEach((guardian, index) => {

        if (!guardian || !shelves[index]) return;

        const guardianRect =
            guardian.getBoundingClientRect();

        const gridRect =
            grid.getBoundingClientRect();

        const feetY =
            guardianRect.bottom -
            gridRect.top;

        shelves[index].style.top =
            `${feetY}px`;
    });
}


window.addEventListener(
    "load",
    alignLibraryShelves
);

window.addEventListener(
    "resize",
    alignLibraryShelves
);
// ==========================================
// 8. Statistics + SUPABASE LIBRARY VISITS
// ==========================================

async function initStats() {

  const statCards = document.querySelectorAll('.stat-card');
  if (!statCards.length) return;

  // ------------------------------------------
  // Counter animation
  // ------------------------------------------
  function animateCount(el, target, duration = 1800) {

    if (typeof reduceMotion !== "undefined" && reduceMotion) {
      el.textContent = Number(target).toLocaleString();
      return;
    }

    let start = null;

    function step(timestamp) {

      if (start === null) start = timestamp;

      const progress = Math.min(
        (timestamp - start) / duration,
        1
      );

      const eased =
        1 - Math.pow(1 - progress, 3);

      el.textContent =
        Math.floor(eased * target).toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent =
          Number(target).toLocaleString();
      }
    }

    requestAnimationFrame(step);
  }


  // ------------------------------------------
  // Supabase client
  // ------------------------------------------

  let visitsClient = null;

  try {

    // مهم جداً:
    // لا نستخدم متغير اسمه supabase
    // حتى لا يحصل تعارض مع مكتبة Supabase

    if (
      window.supabase &&
      typeof window.supabase.createClient === "function"
    ) {

      visitsClient = window.supabase.createClient(
        window.GU_SUPABASE_URL,
        window.GU_SUPABASE_KEY
      );

    } else {

      console.error(
        "Supabase library was not loaded correctly."
      );

    }

  } catch (error) {

    console.error(
      "Supabase client creation failed:",
      error
    );

  }


  // ------------------------------------------
  // Get current visits
  // ------------------------------------------

  async function getLibraryVisits() {

    if (!visitsClient) return 0;

    try {

      const { data, error } = await visitsClient
        .from("library_visits")
        .select("id, visits")
        .eq("id", 1)
        .single();

      if (error) {
        console.error(
          "Library visits SELECT failed:",
          error
        );

        return 0;
      }

      return Number(data?.visits || 0);

    } catch (error) {

      console.error(
        "Library visits connection failed:",
        error
      );

      return 0;
    }
  }


  // ------------------------------------------
  // Increase visit count
  // ------------------------------------------

  async function increaseLibraryVisits() {

    if (!visitsClient) return 0;

    try {

      // نجيب الرقم الحالي
      const { data, error: selectError } =
        await visitsClient
          .from("library_visits")
          .select("id, visits")
          .eq("id", 1)
          .single();

      if (selectError) {

        console.error(
          "Library visits SELECT failed:",
          selectError
        );

        return 0;
      }

      const currentVisits =
        Number(data?.visits || 0);

      const newVisits =
        currentVisits + 1;


      // نحدث الرقم
      const { data: updatedData, error: updateError } =
        await visitsClient
          .from("library_visits")
          .update({
            visits: newVisits
          })
          .eq("id", 1)
          .select("visits")
          .single();


      if (updateError) {

        console.error(
          "Library visits UPDATE failed:",
          updateError
        );

        return currentVisits;
      }


      return Number(
        updatedData?.visits || newVisits
      );

    } catch (error) {

      console.error(
        "Library visits update failed:",
        error
      );

      return 0;
    }
  }


  // ------------------------------------------
  // Intersection Observer
  // ------------------------------------------

  const statObserver =
    new IntersectionObserver(
      async entries => {

        for (const entry of entries) {

          if (!entry.isIntersecting) continue;

          const card = entry.target;

          card.classList.add("visible");

          const numberEl =
            card.querySelector(".stat-number");

          if (!numberEl) {
            statObserver.unobserve(card);
            continue;
          }


          // ------------------------------------
          // Library Visits card
          // ------------------------------------

          if (
            card.getAttribute("aria-label") ===
            "Total library visits"
          ) {

            // منع زيادة العداد أكثر من مرة
            if (!card.dataset.counted) {

              card.dataset.counted = "true";

              const target =
                await increaseLibraryVisits();

              animateCount(
                numberEl,
                target,
                1800
              );
            }

          }

          // ------------------------------------
          // Other statistics
          // ------------------------------------

          else {

            const target =
              parseInt(
                card.getAttribute("data-target"),
                10
              ) || 0;

            if (!card.dataset.counted) {

              card.dataset.counted = "true";

              animateCount(
                numberEl,
                target,
                1800
              );
            }
          }


          statObserver.unobserve(card);
        }

      },
      {
        threshold: 0.4
      }
    );


  statCards.forEach(card => {
    statObserver.observe(card);
  });

}


// ------------------------------------------
// Start statistics
// ------------------------------------------

initStats();
// ==========================================
// 4. Ankh Search Form
// ==========================================
function initAnkhSearch() {

  const ankhInput = document.getElementById('ankhInput');
  const ankhForm = document.getElementById('ankhForm');
  const searchTrigger = document.getElementById('searchTrigger');
  const heroSearch = document.querySelector('.hero-search');

  const entranceTorches = document.querySelectorAll(
    '.torch-entrance-left .flame, .torch-entrance-right .flame'
  );

  // ==========================================
  // OPEN SEARCH
  // ==========================================
  if (searchTrigger && ankhForm && ankhInput) {

    searchTrigger.addEventListener('click', () => {

      ankhForm.classList.add('search-open');

      setTimeout(() => {
        ankhInput.focus();
      }, 500);

    });
  }



  // ==========================================
  // TORCH EFFECT
  // ==========================================
  if (ankhInput) {

    ankhInput.addEventListener('focus', () => {

      entranceTorches.forEach(f => {
        f.style.animationDuration = '0.9s';
      });

    });

    ankhInput.addEventListener('blur', () => {

      entranceTorches.forEach(f => {
        f.style.animationDuration = '2.6s';
      });

    });

  }

  // ==========================================
  // SEARCH
  // ==========================================
  if (ankhForm && ankhInput) {

    ankhForm.addEventListener('submit', (e) => {

      e.preventDefault();

      const query = ankhInput.value.trim();

      if (query) {

        window.open(
          'https://library.gu.edu.eg/cgi-bin/koha/opac-search.pl?q=' +
          encodeURIComponent(query),
          '_blank'
        );

      }

    });

  }

}

// ==========================================
// TEMPLE TABLETS — CLICK FIX
// ==========================================

document.addEventListener('click', function (e) {

    const button = e.target.closest('.temple-tablet');

    if (!button) return;

    const link = button.getAttribute('data-link');

    if (!link || link === '#') return;

    e.preventDefault();

    window.open(
        link,
        '_blank',
        'noopener,noreferrer'
    );

});
document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".temple-action[data-link]").forEach(button => {

    button.addEventListener("click", () => {

      const link = button.dataset.link;

      if (!link) return;

      button.classList.add("is-opening");

      setTimeout(() => {
        window.open(link, "_blank", "noopener,noreferrer");
      }, 220);

    });

  });

});
// ==========================================
// TEMPLE GATE — FAST SCROLL OPEN
// يفتح أثناء النزول في الصفحة
// ==========================================
function initScrollGate() {

    const entrance =
        document.getElementById("entrance");

    const doorLeft =
        document.getElementById("doorLeft");

    const doorRight =
        document.getElementById("doorRight");

    const gateGlow =
        document.querySelector(".gate-glow");


    if (
        !entrance ||
        !doorLeft ||
        !doorRight
    ) {
        console.warn(
            "Temple Gate elements not found"
        );

        return;
    }


    /* ==========================================
       إعداد الحركة
    ========================================== */

    doorLeft.style.transformOrigin =
        "right center";

    doorRight.style.transformOrigin =
        "left center";

    doorLeft.style.transformStyle =
        "preserve-3d";

    doorRight.style.transformStyle =
        "preserve-3d";


    /* ==========================================
       تحديث الباب أثناء الـ Scroll
    ========================================== */

    function updateGate() {

        const rect =
            entrance.getBoundingClientRect();

        const screenHeight =
            window.innerHeight;


        /*
         * يبدأ الباب في الفتح عندما
         * يدخل المعبد الشاشة.
         *
         * كلما نزلت أكثر → الباب يفتح أكثر.
         */

        const start =
            screenHeight * 0.85;

        const end =
            screenHeight * 0.25;


        let progress =
            (start - rect.top) /
            (start - end);


        /* من 0 إلى 1 */

        progress =
            Math.max(
                0,
                Math.min(
                    1,
                    progress
                )
            );


        /* ======================================
           تسريع الحركة
        ====================================== */

        /*
         * easeOut
         * يجعل الباب يفتح بسرعة في البداية
         */

        const eased =
            1 -
            Math.pow(
                1 - progress,
                2.2
            );


        /* ======================================
           زوايا الباب
        ====================================== */

        const leftAngle =
            -2 -
            (84 * eased);

        const rightAngle =
            2 +
            (84 * eased);


        doorLeft.style.transform =
            `rotateY(${leftAngle}deg)`;

        doorRight.style.transform =
            `rotateY(${rightAngle}deg)`;


        /* ======================================
           إضاءة البوابة
        ====================================== */

        if (gateGlow) {

            gateGlow.style.opacity =
                0.9 -
                (0.65 * eased);

        }

    }


    /* ==========================================
       Scroll Performance
    ========================================== */

    let ticking = false;


    function onScroll() {

        if (ticking)
            return;


        ticking = true;


        requestAnimationFrame(() => {

            updateGate();

            ticking = false;

        });

    }


    window.addEventListener(
        "scroll",
        onScroll,
        {
            passive: true
        }
    );


    /* ==========================================
       Resize
    ========================================== */

    window.addEventListener(
        "resize",
        updateGate,
        {
            passive: true
        }
    );


    /* ==========================================
       أول تشغيل
    ========================================== */

    updateGate();


    console.log(
        "𓂀 Fast Scroll Gate activated"
    );

}
/* =========================================
   TEMPLE DOOR - OPEN ON SCROLL
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const entrance = document.getElementById("entrance");

    if (!entrance) return;

    let opened = false;

    function checkTempleDoor() {

        const rect = entrance.getBoundingClientRect();

        // يفتح الباب عندما ننزل ونقترب من منطقة المعبد
        if (rect.top <= window.innerHeight * 0.65 && !opened) {

            opened = true;

            entrance.classList.add("door-opening");
        }
    }

    window.addEventListener("scroll", checkTempleDoor, {
        passive: true
    });

    // تشغيل الفحص عند تحميل الصفحة
    checkTempleDoor();

});
/* =========================================================
   🏺 GU LIBRARY ⇄ KEMET JOURNEY
   AUTO 30s + HOVER SWITCH
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const titleContainer =
        document.querySelector(".temple-library-title");

    const pageTitle =
        document.getElementById("libraryPageTitle");

    if (!titleContainer || !pageTitle) {
        console.warn("Page title elements not found.");
        return;
    }

    const titles = [
        "GU LIBRARY",
        "KEMET JOURNEY"
    ];

    let currentTitle = 0;
    let isHovering = false;

    /* الاسم الأول */
    pageTitle.textContent = titles[currentTitle];


    /* =====================================================
       🔄 تغيير تلقائي كل 30 ثانية
    ===================================================== */

    setInterval(function () {

        currentTitle =
            (currentTitle + 1) % titles.length;

        if (!isHovering) {
            pageTitle.textContent =
                titles[currentTitle];
        }

    }, 30000);


    /* =====================================================
       🖱️ دخول الماوس
    ===================================================== */

    titleContainer.addEventListener("mouseenter", function () {

        isHovering = true;

        const nextTitle =
            (currentTitle + 1) % titles.length;

        pageTitle.textContent =
            titles[nextTitle];

    });


    /* =====================================================
       🖱️ خروج الماوس
    ===================================================== */

    titleContainer.addEventListener("mouseleave", function () {

        isHovering = false;

        pageTitle.textContent =
            titles[currentTitle];

    });

});
/* =========================================================
   🎵 TEMPLE MUSIC CONTROLLER
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

const musicBtn = document.getElementById("mainMusicBtn");
    const bgMusic = document.getElementById("bgMusic");

    if (!musicBtn || !bgMusic) return;


    /* الحالة الابتدائية */
    musicBtn.classList.remove("is-playing");
    musicBtn.setAttribute("aria-pressed", "false");
    musicBtn.setAttribute("aria-label", "Play temple music");


    /* =====================================================
       UPDATE BUTTON STATE
    ===================================================== */

    function updateMusicButton() {

        if (!bgMusic.paused) {

            musicBtn.classList.add("is-playing");

            musicBtn.setAttribute(
                "aria-pressed",
                "true"
            );

            musicBtn.setAttribute(
                "aria-label",
                "Pause temple music"
            );

        } else {

            musicBtn.classList.remove("is-playing");

            musicBtn.setAttribute(
                "aria-pressed",
                "false"
            );

            musicBtn.setAttribute(
                "aria-label",
                "Play temple music"
            );
        }
    }


    /* =====================================================
       BUTTON CLICK
    ===================================================== */

    musicBtn.addEventListener("click", async () => {

        try {

            if (bgMusic.paused) {

                await bgMusic.play();

            } else {

                bgMusic.pause();

            }

            updateMusicButton();

        } catch (error) {

            console.warn(
                "Temple music could not be played:",
                error
            );

        }

    });


    /* =====================================================
       AUDIO EVENTS
       تضمن إن الشكل يفضل متزامن مع الصوت
    ===================================================== */

    bgMusic.addEventListener(
        "play",
        updateMusicButton
    );

    bgMusic.addEventListener(
        "pause",
        updateMusicButton
    );

    bgMusic.addEventListener(
        "ended",
        updateMusicButton
    );


    /* الحالة الأولى */
    updateMusicButton();

});
document.addEventListener("DOMContentLoaded", () => {

    const musicButtons = document.querySelectorAll(".music-btn");

    musicButtons.forEach((button, index) => {

        // نحتفظ بالزرار الجديد فقط
        if (button.id !== "mainMusicBtn") {
            button.remove();
        }

    });

});
document.addEventListener("DOMContentLoaded", () => {

    const chest =
        document.getElementById("treasureChest");

    const form =
        document.getElementById("ankhForm");

    const input =
        document.getElementById("ankhInput");

    const heroSearch =
        document.querySelector(".hero-search");

    if (!chest || !form || !input || !heroSearch) {

        console.error("SEARCH SYSTEM MISSING:", {
            chest,
            form,
            input,
            heroSearch
        });

        return;
    }


    /* =========================================
       TREASURE CHEST → OPEN ANKH
    ========================================= */

    chest.addEventListener("click", (event) => {

        event.preventDefault();
        event.stopPropagation();

        console.log("TREASURE CHEST OPENED");

        /* فتح الصندوق */
        chest.classList.add("open");

        /* إظهار البحث */
        heroSearch.classList.add("search-visible");

        /* التركيز على حقل البحث بعد ظهور مفتاح الحياة */
        setTimeout(() => {

            input.focus();

        }, 700);

    });


    /* =========================================
       SEARCH → KOHA
    ========================================= */

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        const query =
            input.value.trim();

        if (!query) {

            input.focus();

            return;

        }

        const searchURL =
            "https://library.gu.edu.eg/cgi-bin/koha/opac-search.pl?q=" +
            encodeURIComponent(query);

        window.open(
            searchURL,
            "_blank",
            "noopener,noreferrer"
        );

    });

});
document.addEventListener("DOMContentLoaded", () => {

    const chest = document.getElementById("treasureChest");
    const form = document.getElementById("ankhForm");
    const ankhOpen = document.querySelector("#ankhForm .ankh-open");
    const input = document.getElementById("ankhInput");

    console.log("ANKH SYSTEM:", {
        chest,
        form,
        ankhOpen,
        input
    });

    if (!chest || !form || !ankhOpen) {
        console.error("ANKH ELEMENTS NOT FOUND");
        return;
    }

    chest.addEventListener("click", () => {

        console.log("CHEST CLICKED → SHOW ANKH");

        /* فتح الصندوق */
        chest.classList.add("open");

        /* إظهار الفورم */
        form.classList.add("ankh-visible");

        /* إظهار مفتاح الحياة بالقوة */
        ankhOpen.style.setProperty(
            "display",
            "flex",
            "important"
        );

        ankhOpen.style.setProperty(
            "opacity",
            "1",
            "important"
        );

        ankhOpen.style.setProperty(
            "visibility",
            "visible",
            "important"
        );

        /* إظهار الـ hero-search نفسه */
        const hero = form.closest(".hero-search");

        if (hero) {

            hero.style.setProperty(
                "display",
                "flex",
                "important"
            );

            hero.style.setProperty(
                "opacity",
                "1",
                "important"
            );

            hero.style.setProperty(
                "visibility",
                "visible",
                "important"
            );

        }

        /* التركيز على البحث */
        setTimeout(() => {

            if (input) {
                input.focus();
            }

        }, 800);

    });

});
document.addEventListener("DOMContentLoaded", () => {

    const chest = document.getElementById("treasureChest");
    const form = document.getElementById("ankhForm");
    const ankhOpen = document.querySelector("#ankhForm .ankh-open");
    const input = document.getElementById("ankhInput");

    if (!chest || !form || !ankhOpen) return;

    ankhOpen.addEventListener("mouseleave", () => {

        console.log("MOUSE LEFT ANKH → CLOSE");

        // قفل الصندوق
        chest.classList.remove("open");

        // إخفاء مفتاح الحياة
        form.classList.remove("ankh-visible");

        ankhOpen.style.setProperty(
            "display",
            "none",
            "important"
        );

        ankhOpen.style.setProperty(
            "opacity",
            "0",
            "important"
        );

        ankhOpen.style.setProperty(
            "visibility",
            "hidden",
            "important"
        );

        // إزالة التركيز
        if (input) {
            input.blur();
        }

    });

});
/* ==========================================
   TEMPLE MUSIC — PLAY / PAUSE TOGGLE
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const music = document.getElementById("bgMusic");
    const button = document.getElementById("mainMusicBtn");

    if (!music || !button) {
        console.warn("Music elements not found");
        return;
    }

    button.addEventListener("click", async () => {

        try {

            if (music.paused) {

                await music.play();

                button.classList.add("is-playing");
                button.setAttribute("aria-pressed", "true");

            } else {

                music.pause();

                button.classList.remove("is-playing");
                button.setAttribute("aria-pressed", "false");

            }

        } catch (error) {

            console.error("Music error:", error);

        }

    });

});
/* ==========================================
   FINAL MUSIC FIX
   إزالة أي Click listeners قديمة من زر الصوت
   بدون لمس الصندوق أو البحث
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    let oldButton = document.getElementById("mainMusicBtn");
    const music = document.getElementById("bgMusic");

    if (!oldButton || !music) {
        console.error("MUSIC SYSTEM NOT FOUND");
        return;
    }

    /* نعمل نسخة جديدة من الزر
       وبالتالي نمسح أي listeners قديمة عليه */
    const newButton = oldButton.cloneNode(true);

    oldButton.replaceWith(newButton);

    /* زر واحد فقط يتحكم في الصوت */
    newButton.addEventListener("click", async (e) => {

        e.preventDefault();
        e.stopPropagation();

        try {

            if (music.paused) {

                await music.play();

                newButton.classList.add("is-playing");
                newButton.setAttribute(
                    "aria-pressed",
                    "true"
                );

                newButton.setAttribute(
                    "aria-label",
                    "Pause temple music"
                );

                console.log("🎵 MUSIC PLAYING");

            } else {

                music.pause();

                newButton.classList.remove("is-playing");
                newButton.setAttribute(
                    "aria-pressed",
                    "false"
                );

                newButton.setAttribute(
                    "aria-label",
                    "Play temple music"
                );

                console.log("⏸ MUSIC PAUSED");
            }

        } catch (error) {

            console.error(
                "MUSIC ERROR:",
                error
            );

        }

    });

});
/* =========================================================
   PHARAONIC SITE NAVIGATION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const menu = document.querySelector(".pharaoh-menu");
    const toggle = document.getElementById("pharaohMenuToggle");
    const panel = document.getElementById("pharaohMenuPanel");

    if (!menu || !toggle || !panel) return;


    /* =========================
       OPEN / CLOSE
    ========================= */

    toggle.addEventListener("click", function (event) {

        event.stopPropagation();

        menu.classList.toggle("is-open");

        const opened =
            menu.classList.contains("is-open");

        toggle.setAttribute(
            "aria-expanded",
            opened ? "true" : "false"
        );
    });


    /* =========================
       CLICK OUTSIDE
    ========================= */

    document.addEventListener("click", function (event) {

        if (!menu.contains(event.target)) {

            menu.classList.remove("is-open");

            toggle.setAttribute(
                "aria-expanded",
                "false"
            );
        }

    });


    /* =========================
       MENU LINKS
    ========================= */

    panel.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            menu.classList.remove("is-open");

            toggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

});
