// ============================================================
// GU LIBRARY — LIVING COBRA
// VERSION 5
// PREMIUM COBRA + MOUSE FOLLOW + GAME ORBIT
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

  const chamber =
    document.getElementById("gamesChamber");

  if (!chamber) {
    console.error("🐍 gamesChamber not found");
    return;
  }


  // ==========================================================
  // REMOVE OLD COBRA
  // ==========================================================

  document.querySelectorAll(
    "#living-cobra, #living-cobra-v2, #living-cobra-v3, #living-cobra-v4, #living-cobra-v5"
  ).forEach(el => el.remove());


  // ==========================================================
  // COBRA CONTAINER
  // ==========================================================

  const cobra =
    document.createElement("div");

  cobra.id =
    "living-cobra-v5";


  // ==========================================================
  // COBRA SVG
  // ==========================================================

  cobra.innerHTML = `

    <svg
      class="cobra-svg-v5"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >

      <defs>

        <!-- ==================================================
             BODY
        ================================================== -->

        <linearGradient
          id="cobraBodyV5"
          x1="0"
          y1="0"
          x2="1"
          y2="0"
        >

          <stop offset="0%"
                stop-color="#130c04"/>

          <stop offset="18%"
                stop-color="#4b3914"/>

          <stop offset="36%"
                stop-color="#8d7026"/>

          <stop offset="50%"
                stop-color="#d0b04b"/>

          <stop offset="64%"
                stop-color="#927327"/>

          <stop offset="82%"
                stop-color="#4b3813"/>

          <stop offset="100%"
                stop-color="#120a03"/>

        </linearGradient>


        <!-- ==================================================
             HEAD
        ================================================== -->

        <radialGradient
          id="cobraHeadV5"
          cx="50%"
          cy="27%"
          r="78%"
        >

          <stop offset="0%"
                stop-color="#ead67d"/>

          <stop offset="30%"
                stop-color="#c7a743"/>

          <stop offset="58%"
                stop-color="#846a25"/>

          <stop offset="82%"
                stop-color="#493613"/>

          <stop offset="100%"
                stop-color="#1a0f04"/>

        </radialGradient>


        <!-- ==================================================
             HOOD
        ================================================== -->

        <linearGradient
          id="cobraHoodV5"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >

          <stop offset="0%"
                stop-color="#d9c15d"/>

          <stop offset="27%"
                stop-color="#b09234"/>

          <stop offset="55%"
                stop-color="#70551c"/>

          <stop offset="82%"
                stop-color="#39280c"/>

          <stop offset="100%"
                stop-color="#140c03"/>

        </linearGradient>


        <!-- ==================================================
             HOOD INNER
        ================================================== -->

        <radialGradient
          id="cobraHoodInnerV5"
          cx="50%"
          cy="30%"
          r="80%"
        >

          <stop offset="0%"
                stop-color="#715920"/>

          <stop offset="55%"
                stop-color="#39290d"/>

          <stop offset="100%"
                stop-color="#100903"/>

        </radialGradient>


        <!-- ==================================================
             EYE
        ================================================== -->

        <radialGradient
          id="cobraEyeV5"
          cx="40%"
          cy="30%"
          r="70%"
        >

          <stop offset="0%"
                stop-color="#fff3a3"/>

          <stop offset="35%"
                stop-color="#e5c84f"/>

          <stop offset="75%"
                stop-color="#9c7618"/>

          <stop offset="100%"
                stop-color="#382406"/>

        </radialGradient>


        <!-- ==================================================
             GLOW
        ================================================== -->

        <filter
          id="cobraGlowV5"
          x="-60%"
          y="-60%"
          width="220%"
          height="220%"
        >

          <feGaussianBlur
            stdDeviation="5"
          />

        </filter>


        <!-- ==================================================
             BODY SCALE PATTERN
        ================================================== -->

        <pattern
          id="cobraScalesV5"
          width="12"
          height="9"
          patternUnits="userSpaceOnUse"
        >

          <path
            d="
              M 0 4
              Q 3 0
                6 4
              Q 9 0
                12 4
            "
            fill="none"
            stroke="#f1d97e"
            stroke-width="1"
            opacity=".32"
          />

        </pattern>

      </defs>


      <!-- ====================================================
           BODY GLOW
      ==================================================== -->

      <path
        class="cobra-body-glow-v5"
      />


      <!-- ====================================================
           BODY
      ==================================================== -->

      <path
        class="cobra-body-v5"
      />


      <!-- ====================================================
           BODY SCALE TEXTURE
      ==================================================== -->

      <path
        class="cobra-body-scales-v5"
      />


      <!-- ====================================================
           BODY HIGHLIGHT
      ==================================================== -->

      <path
        class="cobra-body-highlight-v5"
      />


      <!-- ====================================================
           NECK
      ==================================================== -->

      <ellipse
        class="cobra-neck-v5"
        rx="24"
        ry="38"
      />


      <!-- ====================================================
           COBRA HEAD
      ==================================================== -->

      <g class="cobra-head-v5">


        <!-- ==================================================
             OUTER HOOD
        ================================================== -->

        <path
          class="cobra-hood-v5"
          d="
            M 0 8

            C -18 -4
              -38 -12
              -62 -12

            C -91 -12
              -115 2
              -125 27

            C -137 57
              -128 87
              -108 107

            C -88 127
              -60 133
              -37 121

            C -22 113
              -10 99
              -5 83

            L 0 91

            L 5 83

            C 10 99
              22 113
              37 121

            C 60 133
              88 127
              108 107

            C 128 87
              137 57
              125 27

            C 115 2
              91 -12
              62 -12

            C 38 -12
              18 -4
              0 8

            Z
          "
        />


        <!-- ==================================================
             INNER HOOD
        ================================================== -->

        <path
          class="cobra-hood-inner-v5"
          d="
            M 0 18

            C -22 5
              -48 3
              -71 14

            C -92 24
              -103 44
              -99 66

            C -94 91
              -76 106
              -54 108

            C -34 110
              -17 99
              -7 82

            L 0 90

            L 7 82

            C 17 99
              34 110
              54 108

            C 76 106
              94 91
              99 66

            C 103 44
              92 24
              71 14

            C 48 3
              22 5
              0 18

            Z
          "
        />


        <!-- ==================================================
             HOOD OUTLINE
        ================================================== -->

        <path
          class="cobra-hood-outline-v5"
          d="
            M 0 9

            C -38 -13
              -86 -13
              -113 15

            C -140 44
              -132 88
              -106 108

            C -82 128
              -47 132
              -23 112

            C -12 103
              -5 92
               0 80

            C 5 92
              12 103
              23 112

            C 47 132
              82 128
              106 108

            C 132 88
              140 44
              113 15

            C 86 -13
              38 -13
               0 9
          "
        />


        <!-- ==================================================
             COBRA SPECTACLE MARK
        ================================================== -->

        <path
          class="cobra-mark-left-v5"
          d="
            M -4 28

            C -19 16
              -38 14
              -58 22

            C -42 27
              -29 36
              -18 48

            C -13 54
              -8 57
              -4 58
          "
        />

        <path
          class="cobra-mark-right-v5"
          d="
            M 4 28

            C 19 16
              38 14
              58 22

            C 42 27
              29 36
              18 48

            C 13 54
               8 57
               4 58
          "
        />


        <!-- ==================================================
             FACE
        ================================================== -->

        <path
          class="cobra-face-v5"
          d="
            M -45 35

            C -43 13
              -25 0
                0 0

            C 25 0
              43 13
              45 35

            L 38 63

            C 33 77
              21 89
               0 95

            C -21 89
              -33 77
              -38 63

            Z
          "
        />


        <!-- ==================================================
             FOREHEAD
        ================================================== -->

        <path
          class="cobra-forehead-v5"
          d="
            M -25 12
            Q 0 -3
              25 12

            Q 18 23
              0 27

            Q -18 23
              -25 12
          "
        />


        <!-- ==================================================
             BROWS
        ================================================== -->

        <path
          class="cobra-brow-left-v5"
          d="
            M -39 31
            Q -26 20
              -11 29
            Q -24 34
              -38 38
          "
        />

        <path
          class="cobra-brow-right-v5"
          d="
            M 39 31
            Q 26 20
              11 29
            Q 24 34
              38 38
          "
        />


        <!-- ==================================================
             EYES
        ================================================== -->

        <ellipse
          class="cobra-eye-v5"
          cx="-18"
          cy="37"
          rx="8"
          ry="7"
        />

        <ellipse
          class="cobra-eye-v5"
          cx="18"
          cy="37"
          rx="8"
          ry="7"
        />


        <!-- ==================================================
             PUPILS
        ================================================== -->

        <ellipse
          class="cobra-pupil-v5"
          cx="-18"
          cy="37"
          rx="2"
          ry="6"
        />

        <ellipse
          class="cobra-pupil-v5"
          cx="18"
          cy="37"
          rx="2"
          ry="6"
        />


        <!-- ==================================================
             EYE GLINT
        ================================================== -->

        <circle
          class="cobra-eye-glint-v5"
          cx="-20"
          cy="34"
          r="1.5"
        />

        <circle
          class="cobra-eye-glint-v5"
          cx="16"
          cy="34"
          r="1.5"
        />


        <!-- ==================================================
             NOSE
        ================================================== -->

        <ellipse
          class="cobra-nose-v5"
          cx="-8"
          cy="57"
          rx="2.5"
          ry="1.8"
        />

        <ellipse
          class="cobra-nose-v5"
          cx="8"
          cy="57"
          rx="2.5"
          ry="1.8"
        />


        <!-- ==================================================
             CHEEK SCALES
        ================================================== -->

        <path
          class="cobra-scale-line-v5"
          d="
            M -30 48
            L -22 51
            L -29 55

            M -27 57
            L -19 60
            L -26 64

            M 30 48
            L 22 51
            L 29 55

            M 27 57
            L 19 60
            L 26 64
          "
        />


        <!-- ==================================================
             MOUTH
        ================================================== -->

        <path
          class="cobra-mouth-v5"
          d="
            M -25 66

            Q -13 76
               0 77

            Q 13 76
              25 66
          "
        />


        <!-- ==================================================
             LOWER MOUTH
        ================================================== -->

        <path
          class="cobra-mouth-lower-v5"
          d="
            M -17 77
            Q 0 86
              17 77
          "
        />


        <!-- ==================================================
             FANGS
        ================================================== -->

        <path
          class="cobra-fangs-v5"
          d="
            M -16 70
            L -12 89
            L -8 72

            M 8 72
            L 12 89
            L 16 70
          "
        />


        <!-- ==================================================
             TONGUE
        ================================================== -->

        <path
          class="cobra-tongue-v5"
        />


        <!-- ==================================================
             HOOD SCALE DETAILS
        ================================================== -->

        <path
          class="cobra-hood-scales-v5"
          d="
            M -77 52
            Q -69 45
              -61 52

            M -82 66
            Q -74 59
              -66 66

            M -77 80
            Q -69 73
              -61 80

            M 77 52
            Q 69 45
              61 52

            M 82 66
            Q 74 59
              66 66

            M 77 80
            Q 69 73
              61 80
          "
        />

      </g>

    </svg>
  `;


  chamber.appendChild(cobra);


  // ==========================================================
  // COBRA CSS
  // ==========================================================

  const style =
    document.createElement("style");


  style.textContent = `

    /* ========================================================
       CONTAINER
    ======================================================== */

    #living-cobra-v5 {

      position: absolute !important;

      inset: 0 !important;

      width: 100% !important;

      height: 100% !important;

      pointer-events: none !important;

      z-index: 30 !important;

      overflow: visible !important;

    }


    #living-cobra-v5 .cobra-svg-v5 {

      position: absolute !important;

      inset: 0 !important;

      width: 100% !important;

      height: 100% !important;

      overflow: visible !important;

      pointer-events: none !important;

    }


    /* ========================================================
       BODY
    ======================================================== */

    #living-cobra-v5 .cobra-body-v5 {

      fill: none !important;

      stroke: url(#cobraBodyV5) !important;

      stroke-width: 34px !important;

      stroke-linecap: round !important;

      stroke-linejoin: round !important;

      filter:
        drop-shadow(
          0 4px 4px rgba(0,0,0,.82)
        )
        drop-shadow(
          0 0 3px rgba(210,176,70,.18)
        );

    }


    /* ========================================================
       BODY GLOW
    ======================================================== */

    #living-cobra-v5 .cobra-body-glow-v5 {

      fill: none !important;

      stroke: #c6a33d !important;

      stroke-width: 48px !important;

      stroke-linecap: round !important;

      opacity: .07 !important;

      filter:
        url(#cobraGlowV5);

    }


    /* ========================================================
       BODY SCALE TEXTURE
    ======================================================== */

    #living-cobra-v5 .cobra-body-scales-v5 {

      fill: none !important;

      stroke: rgba(235,211,126,.38) !important;

      stroke-width: 8px !important;

      stroke-linecap: round !important;

      stroke-dasharray: 1.5 7 !important;

      opacity: .42 !important;

      pointer-events: none !important;

    }


    /* ========================================================
       BODY HIGHLIGHT
    ======================================================== */

    #living-cobra-v5 .cobra-body-highlight-v5 {

      fill: none !important;

      stroke: rgba(255,237,157,.32) !important;

      stroke-width: 5px !important;

      stroke-linecap: round !important;

      opacity: .55 !important;

    }


    /* ========================================================
       NECK
    ======================================================== */

    #living-cobra-v5 .cobra-neck-v5 {

      fill: url(#cobraBodyV5) !important;

      stroke: #1b1005 !important;

      stroke-width: 4px !important;

      filter:
        drop-shadow(
          0 4px 4px rgba(0,0,0,.7)
        );

    }


    /* ========================================================
       HOOD
    ======================================================== */

    #living-cobra-v5 .cobra-hood-v5 {

      fill: url(#cobraHoodV5) !important;

      stroke: #1c1105 !important;

      stroke-width: 4px !important;

      filter:
        drop-shadow(
          0 6px 5px rgba(0,0,0,.72)
        );

    }


    /* ========================================================
       INNER HOOD
    ======================================================== */

    #living-cobra-v5 .cobra-hood-inner-v5 {

      fill: url(#cobraHoodInnerV5) !important;

      opacity: .88 !important;

    }


    /* ========================================================
       HOOD OUTLINE
    ======================================================== */

    #living-cobra-v5 .cobra-hood-outline-v5 {

      fill: none !important;

      stroke: rgba(241,215,123,.48) !important;

      stroke-width: 2px !important;

      stroke-linecap: round !important;

      opacity: .7 !important;

    }


    /* ========================================================
       COBRA MARK
    ======================================================== */

    #living-cobra-v5 .cobra-mark-left-v5,
    #living-cobra-v5 .cobra-mark-right-v5 {

      fill: none !important;

      stroke: rgba(221,191,85,.78) !important;

      stroke-width: 4px !important;

      stroke-linecap: round !important;

      opacity: .78 !important;

    }


    /* ========================================================
       FACE
    ======================================================== */

    #living-cobra-v5 .cobra-face-v5 {

      fill: url(#cobraHeadV5) !important;

      stroke: #211304 !important;

      stroke-width: 4px !important;

      filter:
        drop-shadow(
          0 3px 3px rgba(0,0,0,.72)
        );

    }


    /* ========================================================
       FOREHEAD
    ======================================================== */

    #living-cobra-v5 .cobra-forehead-v5 {

      fill: rgba(255,232,132,.15) !important;

      stroke: rgba(65,45,12,.55) !important;

      stroke-width: 2px !important;

    }


    /* ========================================================
       BROWS
    ======================================================== */

    #living-cobra-v5 .cobra-brow-left-v5,
    #living-cobra-v5 .cobra-brow-right-v5 {

      fill: #3a280c !important;

      opacity: .95 !important;

    }


    /* ========================================================
       EYES
    ======================================================== */

    #living-cobra-v5 .cobra-eye-v5 {

      fill: url(#cobraEyeV5) !important;

      stroke: #160d03 !important;

      stroke-width: 3px !important;

      filter:
        drop-shadow(
          0 0 4px rgba(238,208,76,.25)
        );

    }


    /* ========================================================
       PUPILS
    ======================================================== */

    #living-cobra-v5 .cobra-pupil-v5 {

      fill: #050301 !important;

    }


    /* ========================================================
       EYE GLINT
    ======================================================== */

    #living-cobra-v5 .cobra-eye-glint-v5 {

      fill: #fff3b0 !important;

      opacity: .9 !important;

    }


    /* ========================================================
       NOSE
    ======================================================== */

    #living-cobra-v5 .cobra-nose-v5 {

      fill: #100903 !important;

    }


    /* ========================================================
       FACE SCALES
    ======================================================== */

    #living-cobra-v5 .cobra-scale-line-v5 {

      fill: none !important;

      stroke: rgba(247,224,143,.55) !important;

      stroke-width: 1.5px !important;

      stroke-linecap: round !important;

    }


    /* ========================================================
       HOOD SCALES
    ======================================================== */

    #living-cobra-v5 .cobra-hood-scales-v5 {

      fill: none !important;

      stroke: rgba(226,196,91,.35) !important;

      stroke-width: 2px !important;

      stroke-linecap: round !important;

    }


    /* ========================================================
       MOUTH
    ======================================================== */

    #living-cobra-v5 .cobra-mouth-v5 {

      fill: none !important;

      stroke: #0c0602 !important;

      stroke-width: 4px !important;

      stroke-linecap: round !important;

    }


    /* ========================================================
       LOWER MOUTH
    ======================================================== */

    #living-cobra-v5 .cobra-mouth-lower-v5 {

      fill: none !important;

      stroke: rgba(244,215,133,.32) !important;

      stroke-width: 2px !important;

      stroke-linecap: round !important;

    }


    /* ========================================================
       FANGS
    ======================================================== */

    #living-cobra-v5 .cobra-fangs-v5 {

      fill: none !important;

      stroke: #f5e8b5 !important;

      stroke-width: 4px !important;

      stroke-linecap: round !important;

      stroke-linejoin: round !important;

      filter:
        drop-shadow(
          0 1px 2px rgba(0,0,0,.85)
        );

    }


    /* ========================================================
       TONGUE
    ======================================================== */

    #living-cobra-v5 .cobra-tongue-v5 {

      fill: none !important;

      stroke: #8d2637 !important;

      stroke-width: 2.8px !important;

      stroke-linecap: round !important;

      filter:
        drop-shadow(
          0 0 2px rgba(130,25,40,.4)
        );

    }


    /* ========================================================
       HEAD
    ======================================================== */

    #living-cobra-v5 .cobra-head-v5 {

      transform-box: fill-box !important;

      transform-origin: center !important;

    }

  `;


  document.head.appendChild(style);


  // ==========================================================
  // ELEMENTS
  // ==========================================================

  const svg =
    cobra.querySelector(
      ".cobra-svg-v5"
    );

  const body =
    cobra.querySelector(
      ".cobra-body-v5"
    );

  const glow =
    cobra.querySelector(
      ".cobra-body-glow-v5"
    );

  const scales =
    cobra.querySelector(
      ".cobra-body-scales-v5"
    );

  const highlight =
    cobra.querySelector(
      ".cobra-body-highlight-v5"
    );

  const neck =
    cobra.querySelector(
      ".cobra-neck-v5"
    );

  const head =
    cobra.querySelector(
      ".cobra-head-v5"
    );

  const tongue =
    cobra.querySelector(
      ".cobra-tongue-v5"
    );


  // ==========================================================
  // SIZE
  // ==========================================================

  let width = 0;
  let height = 0;


  // ==========================================================
  // POSITION
  // ==========================================================

  let startX = 0;
  let startY = 0;

  let headX = 0;
  let headY = 0;

  let targetX = 0;
  let targetY = 0;

  let currentAngle = 0;
  let targetAngle = 0;


  // ==========================================================
  // BODY
  // ==========================================================

  const SEGMENTS = 70;

  const points = [];


  for (
    let i = 0;
    i < SEGMENTS;
    i++
  ) {

    points.push({
      x: 0,
      y: 0
    });

  }


  // ==========================================================
  // ORBIT SYSTEM
  // ==========================================================

  let orbitTarget = null;

  let orbitActive = false;

  let orbitAngle = 0;

  let orbitDirection = 1;


  const ORBIT_TRIGGER_DISTANCE = 190;

  const ORBIT_SPEED = 0.75;

  const ORBIT_PADDING = 65;


  // ==========================================================
  // FIND START
  // ==========================================================

  function findStart() {

    const chamberRect =
      chamber.getBoundingClientRect();


    const anchor =
      chamber.querySelector(`
        [data-cobra-anchor],
        .games-title-core,
        .title-core,
        .games-orb,
        .games-circle,
        .chamber-orb
      `);


    if (anchor) {

      const rect =
        anchor.getBoundingClientRect();


      startX =
        rect.left +
        rect.width / 2 -
        chamberRect.left;


      startY =
        rect.bottom -
        chamberRect.top +
        10;

    }

    else {

      startX =
        width / 2;

      startY =
        80;

    }


    headX =
      startX;

    headY =
      startY + 250;


    targetX =
      headX;

    targetY =
      headY;

  }


  // ==========================================================
  // RESIZE
  // ==========================================================

  function resize() {

    const rect =
      chamber.getBoundingClientRect();


    width =
      rect.width;

    height =
      rect.height;


    svg.setAttribute(
      "viewBox",
      `0 0 ${width} ${height}`
    );


    findStart();

  }


  // ==========================================================
  // FIND NEAREST GAME
  // ==========================================================

  function findNearestGame(
    mouseX,
    mouseY
  ) {

    const portalGrid =
      chamber.querySelector(
        "#portalGrid"
      );


    if (!portalGrid)
      return null;


    const games =
      Array.from(
        portalGrid.children
      );


    let nearest =
      null;

    let nearestDistance =
      Infinity;


    games.forEach(
      game => {

        const rect =
          game.getBoundingClientRect();


        const chamberRect =
          chamber.getBoundingClientRect();


        const centerX =
          rect.left +
          rect.width / 2 -
          chamberRect.left;


        const centerY =
          rect.top +
          rect.height / 2 -
          chamberRect.top;


        const distance =
          Math.hypot(
            mouseX - centerX,
            mouseY - centerY
          );


        if (
          distance <
          nearestDistance
        ) {

          nearestDistance =
            distance;

          nearest =
            game;

        }

      }
    );


    if (
      nearest &&
      nearestDistance <=
      ORBIT_TRIGGER_DISTANCE
    ) {

      return nearest;

    }


    return null;

  }


  // ==========================================================
  // ORBIT POSITION
  // ==========================================================

  function getOrbitPosition(
    game,
    angle
  ) {

    const rect =
      game.getBoundingClientRect();


    const chamberRect =
      chamber.getBoundingClientRect();


    const centerX =
      rect.left +
      rect.width / 2 -
      chamberRect.left;


    const centerY =
      rect.top +
      rect.height / 2 -
      chamberRect.top;


    const radiusX =
      rect.width / 2 +
      ORBIT_PADDING;


    const radiusY =
      rect.height / 2 +
      ORBIT_PADDING;


    return {

      x:
        centerX +
        Math.cos(angle) *
        radiusX,

      y:
        centerY +
        Math.sin(angle) *
        radiusY

    };

  }


  // ==========================================================
  // MOUSE
  // ==========================================================

  chamber.addEventListener(
    "pointermove",

    event => {

      const rect =
        chamber.getBoundingClientRect();


      const mouseX =
        event.clientX -
        rect.left;


      const mouseY =
        event.clientY -
        rect.top;


      // ======================================================
      // FIND GAME
      // ======================================================

      const nearestGame =
        findNearestGame(
          mouseX,
          mouseY
        );


      // ======================================================
      // ENTER ORBIT
      // ======================================================

      if (
        nearestGame &&
        nearestGame !== orbitTarget
      ) {

        orbitTarget =
          nearestGame;

        orbitActive =
          true;


        const gameRect =
          orbitTarget.getBoundingClientRect();


        const chamberRect =
          chamber.getBoundingClientRect();


        const centerX =
          gameRect.left +
          gameRect.width / 2 -
          chamberRect.left;


        const centerY =
          gameRect.top +
          gameRect.height / 2 -
          chamberRect.top;


        orbitAngle =
          Math.atan2(
            headY - centerY,
            headX - centerX
          );


        /*
          اتجاه الدوران
          حسب مكان الكوبرا بالنسبة للعبة
        */

        const relativeX =
          headX - centerX;


        const relativeY =
          headY - centerY;


        const cross =
          relativeX *
          (mouseY - centerY)
          -
          relativeY *
          (mouseX - centerX);


        orbitDirection =
          cross >= 0
            ? 1
            : -1;

      }


      // ======================================================
      // RETURN TO MOUSE
      // ======================================================

      if (!nearestGame) {

        orbitActive =
          false;

        orbitTarget =
          null;


        targetX =
          Math.max(
            75,
            Math.min(
              width - 75,
              mouseX
            )
          );


        targetY =
          Math.max(
            100,
            Math.min(
              height - 100,
              mouseY
            )
          );


        targetAngle =
          Math.atan2(
            targetX - headX,
            targetY - headY
          ) *
          180 /
          Math.PI;


        targetAngle =
          Math.max(
            -75,
            Math.min(
              75,
              targetAngle
            )
          );

      }

    },

    true
  );


  // ==========================================================
  // ANIMATION
  // ==========================================================

  function animate(time) {

    const t =
      time * .001;


    // ========================================================
    // ORBIT MODE
    // ========================================================

    if (
      orbitActive &&
      orbitTarget &&
      document.body.contains(
        orbitTarget
      )
    ) {

      orbitAngle +=
        ORBIT_SPEED *
        .016 *
        orbitDirection;


      const orbitPosition =
        getOrbitPosition(
          orbitTarget,
          orbitAngle
        );


      targetX =
        orbitPosition.x;


      targetY =
        orbitPosition.y;


      /*
        اتجاه الحركة المماسية
      */

      const tangentX =
        -Math.sin(
          orbitAngle
        ) *
        orbitDirection;


      const tangentY =
        Math.cos(
          orbitAngle
        ) *
        orbitDirection;


      targetAngle =
        Math.atan2(
          tangentX,
          tangentY
        ) *
        180 /
        Math.PI;


      targetAngle =
        Math.max(
          -75,
          Math.min(
            75,
            targetAngle
          )
        );

    }


    // ========================================================
    // HEAD FOLLOW
    // ========================================================

    headX +=
      (
        targetX -
        headX
      ) * .09;


    headY +=
      (
        targetY -
        headY
      ) * .09;


    // ========================================================
    // ROTATION
    // ========================================================

    currentAngle +=
      (
        targetAngle -
        currentAngle
      ) * .09;


    // ========================================================
    // VECTOR
    // ========================================================

    const dx =
      headX -
      startX;


    const dy =
      headY -
      startY;


    const distance =
      Math.max(
        1,
        Math.hypot(
          dx,
          dy
        )
      );


    const normalX =
      -dy /
      distance;


    const normalY =
      dx /
      distance;


    // ========================================================
    // REALISTIC BODY
    // ========================================================

    for (
      let i = 0;
      i < SEGMENTS;
      i++
    ) {

      const p =
        i /
        (SEGMENTS - 1);


      // ------------------------------------------------------
      // MAIN SLITHER
      // ------------------------------------------------------

      const wave =
        Math.sin(
          t * 3.1 -
          p * 13
        ) *
        17 *
        Math.sin(
          p * Math.PI
        );


      // ------------------------------------------------------
      // SECONDARY MOVEMENT
      // ------------------------------------------------------

      const secondaryWave =
        Math.sin(
          t * 1.7 +
          p * 8
        ) *
        5 *
        Math.sin(
          p * Math.PI
        );


      let x =
        startX +
        dx * p;


      let y =
        startY +
        dy * p;


      // ------------------------------------------------------
      // NATURAL SLITHER
      // ------------------------------------------------------

      const movement =
        (
          wave +
          secondaryWave
        ) *
        Math.sin(
          p * Math.PI
        );


      x +=
        normalX *
        movement;


      y +=
        normalY *
        movement;


      // ------------------------------------------------------
      // MICRO MOVEMENT
      // ------------------------------------------------------

      const microWave =
        Math.sin(
          t * 5 +
          p * 25
        ) *
        1.8 *
        Math.sin(
          p * Math.PI
        );


      x +=
        normalX *
        microWave;


      y +=
        normalY *
        microWave;


      // ------------------------------------------------------
      // TAIL CURVE
      // ------------------------------------------------------

      if (p < .18) {

        const tailCurve =
          Math.sin(
            p * Math.PI * 5 +
            t * 1.5
          ) *
          4;


        x +=
          normalX *
          tailCurve;


        y +=
          normalY *
          tailCurve;

      }


      // ------------------------------------------------------
      // TAIL START
      // ------------------------------------------------------

      if (i === 0) {

        x =
          startX;

        y =
          startY;

      }


      // ------------------------------------------------------
      // HEAD CONNECTION
      // ------------------------------------------------------

      if (
        i ===
        SEGMENTS - 1
      ) {

        x =
          headX;

        y =
          headY;

      }


      points[i].x =
        x;

      points[i].y =
        y;

    }


    // ========================================================
    // BODY PATH
    // ========================================================

    let path =
      `
      M
      ${points[0].x}
      ${points[0].y}
      `;


    for (
      let i = 1;
      i < SEGMENTS;
      i++
    ) {

      const previous =
        points[i - 1];


      const current =
        points[i];


      const cx =
        (
          previous.x +
          current.x
        ) / 2;


      const cy =
        (
          previous.y +
          current.y
        ) / 2;


      path +=
        `
        Q
        ${previous.x}
        ${previous.y}
        ${cx}
        ${cy}
        `;

    }


    path +=
      `
      L
      ${headX}
      ${headY}
      `;


    body.setAttribute(
      "d",
      path
    );


    glow.setAttribute(
      "d",
      path
    );


    scales.setAttribute(
      "d",
      path
    );


    highlight.setAttribute(
      "d",
      path
    );


    // ========================================================
    // NECK
    // ========================================================

    neck.setAttribute(
      "cx",
      headX
    );


    neck.setAttribute(
      "cy",
      headY
    );


    neck.setAttribute(
      "transform",
      `
      rotate(
        ${currentAngle}
        ${headX}
        ${headY}
      )
      `
    );


    // ========================================================
    // HEAD
    // ========================================================

    head.setAttribute(
      "transform",
      `
      translate(
        ${headX}
        ${headY}
      )

      rotate(
        ${currentAngle}
      )

      scale(.68)
      `
    );


    // ========================================================
    // TONGUE
    // ========================================================

    const tongueMove =
      Math.sin(
        t * 14
      ) * 5;


    tongue.setAttribute(
      "d",
      `
      M 0 75

      Q
      ${tongueMove}
      87
      ${tongueMove}
      100

      M
      ${tongueMove}
      100

      L
      ${tongueMove - 7}
      92

      M
      ${tongueMove}
      100

      L
      ${tongueMove + 7}
      92
      `
    );


    requestAnimationFrame(
      animate
    );

  }


  // ==========================================================
  // START
  // ==========================================================

  resize();


  window.addEventListener(
    "resize",
    resize
  );


  requestAnimationFrame(
    animate
  );


  console.log(
    "🐍 COBRA V5 READY — MOUSE FOLLOW + GAME ORBIT"
  );

});