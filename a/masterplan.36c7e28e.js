/* Masterplan 3D. Se carga junto con three.js cuando el visitante se acerca a #masterplan.
   Usa los helpers que expone la página en window.PDS (textos, configuración, formato). */
(function masterplan() {
  const { $, reduce, coarse, statusOf, STATUS_TXT, sideOf, money, usd, fill, I18N, CONFIG, LOCALE } = window.PDS;
  const GEO = {"site":[[-0.48,197.5],[66.52,123.1],[46.47,20.68],[9.6,-196.29],[-63,-124],[-48,-47],[-39.85,-9.68],[-29.18,89.37],[-22.14,125.08],[-15.21,149.12]],"roads":[[[-50.29,-84.12],[-45.13,-79.09],[-17.26,-107.69],[28.47,165.35],[34.63,158.51],[-10.58,-111.43],[-14.21,-110.82],[18.44,-144.31],[16.95,-153.1]]],"porteria":[[29.35,164.38],[46.81,144.99],[45.66,138.75],[19.22,155.54],[19.83,173.95]],"comun":[[32.7,146.98],[8.26,1.08],[44.28,7.76],[29.22,-80.87],[33.29,-56.94],[0.33,-46.28],[-10.58,-111.43]],"lots":[{"id":1,"area":800,"poly":[[-0.48,197.5],[28.47,165.35],[28.46,165.27],[19.83,173.95],[19.22,155.54],[25.41,151.61],[-11.82,160.26],[-15.21,149.12]]},{"id":2,"area":800,"poly":[[22.61,130.37],[-17.9,139.77],[-15.21,149.12],[-11.82,160.26],[25.41,151.61],[26.1,151.17]]},{"id":3,"area":800,"poly":[[-22.14,125.08],[-17.9,139.77],[22.61,130.37],[-17.26,-107.69],[19.28,110.46],[-23.08,120.3]]},{"id":4,"area":800,"poly":[[-23.08,120.3],[19.28,110.46],[-17.26,-107.69],[16.03,91.05],[-26.88,101.01],[-29.18,89.37]]},{"id":5,"area":800,"poly":[[-29.18,89.37],[-26.88,101.01],[16.03,91.05],[12.81,71.82],[-30,81.76]]},{"id":6,"area":800,"poly":[[-30,81.76],[12.81,71.82],[-17.26,-107.69],[9.52,52.22],[-32.14,61.89],[-39.85,-9.68]]},{"id":7,"area":800,"poly":[[-32.14,61.89],[9.52,52.22],[6.15,32.07],[-34.34,41.47],[-39.85,-9.68]]},{"id":8,"area":800,"poly":[[-34.34,41.47],[6.15,32.07],[2.67,11.31],[-36.61,20.43]]},{"id":9,"area":800,"poly":[[-36.61,20.43],[2.67,11.31],[-17.26,-107.69],[-0.91,-10.1],[-38.95,-1.27]]},{"id":10,"area":800,"poly":[[-39.85,-9.68],[-38.95,-1.27],[-0.91,-10.1],[-4.58,-31.98],[-42.78,-23.11]]},{"id":11,"area":800,"poly":[[-42.78,-23.11],[-4.58,-31.98],[-8.16,-53.35],[-47.4,-44.24],[-48,-47]]},{"id":12,"area":800,"poly":[[-48,-47],[-47.4,-44.24],[-8.16,-53.35],[-11.66,-74.27],[-51.51,-65.02],[-53.57,-75.59]]},{"id":13,"area":800,"poly":[[-45.13,-79.09],[-47.71,-81.61],[-53.57,-75.59],[-51.51,-65.02],[-11.66,-74.27],[-17.26,-107.69]]},{"id":14,"area":800,"poly":[[-48.69,-138.24],[-63,-124],[-53.57,-75.59],[-47.71,-81.61],[-50.29,-84.12],[-41.18,-93.46]]},{"id":15,"area":800,"poly":[[-34.3,-152.58],[-48.69,-138.24],[-41.18,-93.46],[-26.85,-108.17]]},{"id":16,"area":800,"poly":[[-19.77,-167.04],[-63,-124],[-34.3,-152.58],[-26.85,-108.17],[-50.29,-84.12],[-12.39,-123]]},{"id":17,"area":847,"poly":[[-5.13,-181.62],[-63,-124],[-19.77,-167.04],[-12.39,-123],[2.19,-137.96]]},{"id":18,"area":939,"poly":[[9.6,-196.29],[-5.13,-181.62],[2.19,-137.96],[16.95,-153.1]]},{"id":19,"area":800,"poly":[[-10.58,-111.43],[-8.5,-98.98],[24.65,-107.79],[18.44,-144.31],[-14.21,-110.82]]},{"id":20,"area":800,"poly":[[-4.16,-73.06],[29.05,-81.89],[24.65,-107.79],[-8.5,-98.98]]},{"id":21,"area":800,"poly":[[0.33,-46.28],[33.29,-56.94],[29.22,-80.87],[18.44,-144.31],[29.05,-81.89],[-4.16,-73.06],[-10.58,-111.43]]},{"id":22,"area":800,"poly":[[44.28,7.76],[8.26,1.08],[13.8,34.13],[46.51,20.86]]},{"id":23,"area":800,"poly":[[17.62,56.99],[50.94,43.47],[46.51,20.86],[13.8,34.13]]},{"id":24,"area":800,"poly":[[21.38,79.44],[55.28,65.69],[46.47,20.68],[50.94,43.47],[17.62,56.99],[8.26,1.08]]},{"id":25,"area":800,"poly":[[25.08,101.51],[59.56,87.52],[46.47,20.68],[55.28,65.69],[21.38,79.44],[8.26,1.08]]},{"id":26,"area":800,"poly":[[28.72,123.22],[63.76,109],[59.56,87.52],[25.08,101.51]]},{"id":27,"area":800,"poly":[[46.81,144.99],[66.52,123.1],[63.76,109],[28.72,123.22],[8.26,1.08],[32.7,146.98],[45.66,138.75]]}],"roadLine":[[32.84,169.62],[-14.13,-110.83]],"diagLine":[[-47.71,-81.61],[21.01,-152.11]],"boundary":{"1":[-0.48,197.5],"2":[66.52,123.1],"3":[46.47,20.68],"4":[29.22,-80.87],"5":[9.6,-196.29],"6":[-63,-124],"7":[-48,-47],"8":[-39.85,-9.68],"9":[-29.18,89.37],"10":[-22.14,125.08],"11":[-15.21,149.12]}};
  let closePanel = null;
  if (!window.THREE || !THREE.OrbitControls) { $('#stage').innerHTML = `<p style="padding:40px;color:#16301f">${I18N.no3d}</p>`; return; }
  const stage = $('#stage'), canvas = $('#three');
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' }); }
  catch (e) { stage.innerHTML = `<p style="padding:40px;color:#16301f">${I18N.noWebgl}</p>`; return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, coarse ? 1.6 : 2));
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputEncoding = THREE.sRGBEncoding; renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const DAY = { fog: 0xcfdcd6, skyTop: 0x6fa3d6, skyBot: 0xe8efe6, hemi: 1.0, sun: 2.6, sunCol: 0xffe2b8, exp: 1.05 };
  const NIGHT = { fog: 0x0d1626, skyTop: 0x050a18, skyBot: 0x1d2a44, hemi: .18, sun: .25, sunCol: 0x9fb4ff, exp: 1.25 };
  scene.fog = new THREE.Fog(DAY.fog, 650, 2300);
  const camera = new THREE.PerspectiveCamera(38, 1, 1, 4000);
  const controls = new THREE.OrbitControls(camera, canvas);
  controls.enableDamping = true; controls.dampingFactor = .07; controls.maxPolarAngle = Math.PI * .47; controls.minDistance = 40; controls.maxDistance = 900;
  controls.target.set(0, 0, 0); controls.autoRotate = !reduce; controls.autoRotateSpeed = .35;
  controls.enablePan = true; controls.screenSpacePanning = false;
  if (coarse) controls.enabled = false;

  // sky dome
  const skyU = { top: { value: new THREE.Color(DAY.skyTop) }, bot: { value: new THREE.Color(DAY.skyBot) } };
  const sky = new THREE.Mesh(new THREE.SphereGeometry(2500, 32, 16), new THREE.ShaderMaterial({ side: THREE.BackSide, depthWrite: false, fog: false, uniforms: skyU,
    vertexShader: 'varying vec3 vP; void main(){ vP=normalize(position); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }',
    fragmentShader: 'uniform vec3 top; uniform vec3 bot; varying vec3 vP; void main(){ float h=clamp(vP.y*1.6+.05,0.,1.); gl_FragColor=vec4(mix(bot,top,pow(h,.7)),1.); }' }));
  scene.add(sky);
  // stars
  const starG = new THREE.BufferGeometry(); const sp = [];
  for (let i = 0; i < 1500; i++) { const t = Math.random() * Math.PI * 2, p = Math.random() * Math.PI * .45; sp.push(2200 * Math.sin(p) * Math.cos(t), 2200 * Math.cos(p), 2200 * Math.sin(p) * Math.sin(t)); }
  starG.setAttribute('position', new THREE.Float32BufferAttribute(sp, 3));
  const stars = new THREE.Points(starG, new THREE.PointsMaterial({ color: 0xffffff, size: 2.2, sizeAttenuation: false, transparent: true, opacity: 0, fog: false }));
  scene.add(stars);

  const hemi = new THREE.HemisphereLight(0xdfeeff, 0x4a5a32, DAY.hemi); scene.add(hemi);
  const sun = new THREE.DirectionalLight(DAY.sunCol, DAY.sun);
  sun.position.set(-180, 260, 140); sun.castShadow = true;
  sun.shadow.mapSize.set(coarse ? 1024 : 2048, coarse ? 1024 : 2048);
  Object.assign(sun.shadow.camera, { left: -260, right: 260, top: 260, bottom: -260, near: 10, far: 900 });
  sun.shadow.bias = -0.0006; scene.add(sun);

  // helpers
  const V = (x, y) => new THREE.Vector2(x, y);
  const shapeOf = poly => new THREE.Shape(poly.map(p => V(p[0], p[1])));
  const flat = (geo) => { geo.rotateX(-Math.PI / 2); return geo; };
  function noise(x, y) { return Math.sin(x * .013 + Math.cos(y * .011) * 1.7) * Math.cos(y * .009 - x * .004) + .5 * Math.sin(x * .031 + y * .027); }
  function canvasTex(draw, w = 512, h = 512, rep = 1) {
    const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h);
    const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rep, rep); t.encoding = THREE.sRGBEncoding; t.anisotropy = 4; return t;
  }
  const grassTex = canvasTex((g, w, h) => { g.fillStyle = '#5d7f3a'; g.fillRect(0, 0, w, h); for (let i = 0; i < 9000; i++) { const v = Math.random(); g.fillStyle = `rgba(${v > .5 ? '150,175,90' : '60,85,40'},${Math.random() * .35})`; g.fillRect(Math.random() * w, Math.random() * h, 2 + Math.random() * 3, 2 + Math.random() * 3); } }, 256, 256, 60);
  const lotTex = canvasTex((g, w, h) => { g.fillStyle = '#ffffff'; g.fillRect(0, 0, w, h); for (let i = 0; i < 3000; i++) { g.fillStyle = `rgba(${Math.random() > .5 ? '255,255,255' : '170,180,150'},${Math.random() * .35})`; g.fillRect(Math.random() * w, Math.random() * h, 2, 2); } }, 128, 128, 1);
  lotTex.repeat.set(.08, .08);

  // ground with terrain (flat near site)
  const SITE_C = new THREE.Vector2(5, 0);
  const groundY = (x, z) => { const d = Math.hypot((x - SITE_C.x) / 1.0, (z) / 2.6); const f = THREE.MathUtils.smoothstep(d, 110, 320); return -0.6 + f * (noise(x, z) * 9 + 4); };
  const gGeo = flat(new THREE.PlaneGeometry(3000, 3000, 180, 180));
  const gp = gGeo.attributes.position;
  for (let i = 0; i < gp.count; i++) gp.setY(i, groundY(gp.getX(i), gp.getZ(i)));
  gGeo.computeVertexNormals();
  const ground = new THREE.Mesh(gGeo, new THREE.MeshStandardMaterial({ map: grassTex, roughness: 1 }));
  ground.receiveShadow = true; scene.add(ground);

  // mountains (Sierra Nevada to the north/northwest)
  function ridge(w, d, h, seg, col1, col2) {
    const g = new THREE.PlaneGeometry(w, d, seg, Math.round(seg / 3)); g.rotateX(-Math.PI / 2);
    const p = g.attributes.position, cols = []; const c1 = new THREE.Color(col1), c2 = new THREE.Color(col2), c = new THREE.Color();
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), z = p.getZ(i); const edge = 1 - Math.abs(z) / (d / 2);
      let y = 0, a = 1, fx = .004; for (let o = 0; o < 5; o++) { y += a * (1 - Math.abs(Math.sin(x * fx + o * 1.7 + Math.cos(z * fx * 1.3 + o)))); a *= .5; fx *= 2.1; }
      y = Math.max(0, y * h * Math.pow(Math.max(edge, 0), .7) - 20); p.setY(i, y);
      c.copy(c1).lerp(c2, Math.min(1, y / h)); cols.push(c.r, c.g, c.b);
    }
    g.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3)); g.computeVertexNormals();
    return new THREE.Mesh(g, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, flatShading: true }));
  }
  const m1 = ridge(2800, 800, 340, 130, 0x4f6b3c, 0x8a9a92); m1.position.set(-250, -10, -1050); scene.add(m1);
  const m2 = ridge(1800, 500, 170, 90, 0x56763f, 0x6e8a5c); m2.position.set(-900, -8, -500); m2.rotation.y = Math.PI / 2.4; scene.add(m2);

  // external road (vía a Valledupar) along vertices 1–2, extended
  const b1 = GEO.boundary['1'], b2 = GEO.boundary['2'];
  (function extRoad() {
    const dx = b2[0] - b1[0], dy = b2[1] - b1[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = uy, ny = -ux;
    const off = 9, w = 9, a = [b1[0] - ux * 500 - nx * off, b1[1] - uy * 500 - ny * off], b = [b2[0] + ux * 700 - nx * off, b2[1] + uy * 700 - ny * off];
    const poly = [[a[0] - nx * w / 2 * -1, a[1] - ny * w / 2 * -1], [b[0] + nx * w / 2, b[1] + ny * w / 2], [b[0] - nx * w / 2, b[1] - ny * w / 2], [a[0] - nx * w / 2, a[1] - ny * w / 2]];
    const g = flat(new THREE.ShapeGeometry(shapeOf([[a[0] + nx * w / 2, a[1] + ny * w / 2], [b[0] + nx * w / 2, b[1] + ny * w / 2], [b[0] - nx * w / 2, b[1] - ny * w / 2], [a[0] - nx * w / 2, a[1] - ny * w / 2]])));
    const m = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ color: 0x3b3d3a, roughness: .9 })); m.position.y = .05; m.receiveShadow = true; scene.add(m);
  })();

  // site pad
  const pad = new THREE.Mesh(flat(new THREE.ExtrudeGeometry(shapeOf(GEO.site), { depth: .5, bevelEnabled: false })), new THREE.MeshStandardMaterial({ color: 0x8a7a5c, roughness: 1 }));
  pad.position.y = -.45; pad.receiveShadow = true; scene.add(pad);
  // boundary glow line
  const bl = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(GEO.site.map(p => new THREE.Vector3(p[0], .35, -p[1]))), new THREE.LineBasicMaterial({ color: 0xc19e5a }));
  scene.add(bl);

  // roads
  const roadMat = new THREE.MeshStandardMaterial({ color: 0x8d8b84, roughness: .85 });
  GEO.roads.forEach(r => { const m = new THREE.Mesh(flat(new THREE.ExtrudeGeometry(shapeOf(r), { depth: .18, bevelEnabled: false })), roadMat); m.receiveShadow = true; scene.add(m); });
  // center dashes
  function dashes(line) { const [a, b] = line, L = Math.hypot(b[0] - a[0], b[1] - a[1]); const ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
    for (let s = 4; s < L - 4; s += 7) { const t = s / L, m = new THREE.Mesh(new THREE.BoxGeometry(3, .02, .25), new THREE.MeshBasicMaterial({ color: 0xf3eee2 })); m.position.set(a[0] + (b[0] - a[0]) * t, .2, -(a[1] + (b[1] - a[1]) * t)); m.rotation.y = ang; scene.add(m); } }
  dashes(GEO.roadLine);

  // lots
  const lotMeshes = [], lotById = {};
  const COL = { disponible: 0xa6cf72, reservado: 0xe0a63b, vendido: 0xb5574a };
  const centroid = poly => { let a = 0, cx = 0, cy = 0; for (let i = 0; i < poly.length; i++) { const [x0, y0] = poly[i], [x1, y1] = poly[(i + 1) % poly.length]; const f = x0 * y1 - x1 * y0; a += f; cx += (x0 + x1) * f; cy += (y0 + y1) * f; } a *= .5; return [cx / (6 * a), cy / (6 * a)]; };
  function numSprite(n) {
    const c = document.createElement('canvas'); c.width = c.height = 128; const g = c.getContext('2d');
    g.fillStyle = 'rgba(22,48,31,.82)'; g.beginPath(); g.arc(64, 64, 52, 0, 7); g.fill(); g.strokeStyle = '#c19e5a'; g.lineWidth = 4; g.stroke();
    g.fillStyle = '#f3eee2'; g.font = '56px Marcellus, Georgia, serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(n, 64, 68);
    const t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding;
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, depthTest: false, transparent: true })); s.scale.set(7, 7, 1); s.renderOrder = 10; return s;
  }
  GEO.lots.forEach(l => {
    const shrink = l.poly; const st = statusOf(l.id);
    const geo = flat(new THREE.ExtrudeGeometry(shapeOf(shrink), { depth: .7, bevelEnabled: true, bevelSize: .25, bevelThickness: .2, bevelSegments: 1 }));
    const mat = new THREE.MeshStandardMaterial({ color: COL[st], map: lotTex, roughness: .95, emissive: 0x000000 });
    const m = new THREE.Mesh(geo, mat); m.castShadow = false; m.receiveShadow = true; m.position.y = -.1;
    m.userData = { id: l.id, area: l.area, status: st, c: centroid(l.poly), poly: l.poly, baseY: -.1 };
    scene.add(m); lotMeshes.push(m); lotById[l.id] = m;
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo, 30), new THREE.LineBasicMaterial({ color: 0xf3eee2, transparent: true, opacity: .55 }));
    m.add(edges);
    const s = numSprite(l.id); s.position.set(m.userData.c[0], 4.5, -m.userData.c[1]); scene.add(s); m.userData.sprite = s;
  });

  // common area: deck, pool, kiosko
  const cc = centroid(GEO.comun);
  const comunMesh = new THREE.Mesh(flat(new THREE.ExtrudeGeometry(shapeOf(GEO.comun), { depth: .45, bevelEnabled: false })), new THREE.MeshStandardMaterial({ color: 0x8fb66a, roughness: 1 }));
  comunMesh.receiveShadow = true; scene.add(comunMesh);
  const ang = Math.atan2(GEO.roadLine[1][1] - GEO.roadLine[0][1], GEO.roadLine[1][0] - GEO.roadLine[0][0]);
  const club = new THREE.Group(); club.position.set(cc[0] + 2, .45, -cc[1]); club.rotation.y = ang + Math.PI / 2; scene.add(club);
  const deck = new THREE.Mesh(new THREE.BoxGeometry(34, .3, 24), new THREE.MeshStandardMaterial({ color: 0xe8dcc2, roughness: .8 })); deck.receiveShadow = true; club.add(deck);
  const poolMat = new THREE.MeshStandardMaterial({ color: 0x3fb2d8, roughness: .05, metalness: .2, emissive: 0x0a3c55, emissiveIntensity: .4 });
  const pool = new THREE.Mesh(new THREE.BoxGeometry(18, .2, 9), poolMat); pool.position.set(-4, .12, 3); club.add(pool);
  const jac = new THREE.Mesh(new THREE.CylinderGeometry(3, 3, .2, 28), poolMat); jac.position.set(8, .12, 3); club.add(jac);
  const kiosk = new THREE.Group(); kiosk.position.set(2, 0, -7); club.add(kiosk);
  const roof = new THREE.Mesh(new THREE.ConeGeometry(8, 5, 12), new THREE.MeshStandardMaterial({ color: 0xb08a4a, roughness: 1, flatShading: true })); roof.position.y = 6; roof.castShadow = true; kiosk.add(roof);
  for (let i = 0; i < 6; i++) { const p = new THREE.Mesh(new THREE.CylinderGeometry(.25, .25, 3.6), new THREE.MeshStandardMaterial({ color: 0x5a3e2b })); const a = i / 6 * Math.PI * 2; p.position.set(Math.cos(a) * 5.5, 1.8, Math.sin(a) * 5.5); p.castShadow = true; kiosk.add(p); }
  for (let i = 0; i < 5; i++) { const u = new THREE.Mesh(new THREE.ConeGeometry(1.6, .6, 10), new THREE.MeshStandardMaterial({ color: 0xf3eee2 })); u.position.set(-12 + i * 4.5, 2.4, 9.5); u.castShadow = true; club.add(u); const st = new THREE.Mesh(new THREE.CylinderGeometry(.06, .06, 2.4), new THREE.MeshStandardMaterial({ color: 0x777777 })); st.position.set(-12 + i * 4.5, 1.2, 9.5); club.add(st); }

  // portería
  const pc = centroid(GEO.porteria);
  const gate = new THREE.Group(); gate.position.set(pc[0], 0, -pc[1]); gate.rotation.y = ang + Math.PI / 2; scene.add(gate);
  const stone = new THREE.MeshStandardMaterial({ color: 0xcab28a, roughness: .9 }), brown = new THREE.MeshStandardMaterial({ color: 0x4a3426, roughness: .7 }), cream = new THREE.MeshStandardMaterial({ color: 0xefe6d4, roughness: .6 });
  const winMat = new THREE.MeshStandardMaterial({ color: 0x9ab7c4, emissive: 0xffc77a, emissiveIntensity: 0, roughness: .2 });
  const add = (g, geo, mat, x, y, z) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true; g.add(m); return m; };
  add(gate, new THREE.BoxGeometry(7, 3.4, 5), cream, 6, 1.7, 0);
  add(gate, new THREE.BoxGeometry(5.6, 1.6, .1), winMat, 6, 2.1, 2.55);
  add(gate, new THREE.BoxGeometry(2.4, 5, 2.2), stone, 3.5, 2.5, -1);
  add(gate, new THREE.BoxGeometry(22, .5, 9), brown, 0, 6.2, 0);
  for (const x of [-8, -2, 4, 9]) add(gate, new THREE.CylinderGeometry(.35, .35, 6), cream, x, 3, 3.6);
  const sign = add(gate, new THREE.BoxGeometry(1.4, 7, 5), brown, -10, 3.5, 0);
  add(gate, new THREE.BoxGeometry(.2, 5, 3.4), stone, -9.2, 3.5, 0);
  const bar = add(gate, new THREE.BoxGeometry(.2, .2, 7), new THREE.MeshStandardMaterial({ color: 0xffffff }), 1, 1.1, -1);

  // street lamps along the road
  const lampHeads = [], lampLights = [];
  const lampMat = new THREE.MeshStandardMaterial({ color: 0xfff1cf, emissive: 0xffc06a, emissiveIntensity: 0 });
  (function lamps() {
    const [a, b] = GEO.roadLine, L = Math.hypot(b[0] - a[0], b[1] - a[1]); const ux = (b[0] - a[0]) / L, uy = (b[1] - a[1]) / L;
    let k = 0;
    for (let s = 30; s < L - 10; s += 34) {
      const side = (k++ % 2 ? 1 : -1) * 4.6; const x = a[0] + ux * s + uy * side, y = a[1] + uy * s - ux * side;
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(.12, .15, 5), new THREE.MeshStandardMaterial({ color: 0x2b2b2b })); pole.position.set(x, 2.5, -y); scene.add(pole);
      const head = new THREE.Mesh(new THREE.SphereGeometry(.5, 10, 8), lampMat); head.position.set(x, 5.1, -y); scene.add(head); lampHeads.push(head);
      if (lampLights.length < 6 && k % 2) { const pl = new THREE.PointLight(0xffb85c, 0, 38, 2); pl.position.set(x, 5, -y); scene.add(pl); lampLights.push(pl); }
    }
  })();

  // trees (instanced)
  function pointInPoly(x, y, poly) { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const [xi, yi] = poly[i], [xj, yj] = poly[j]; if (((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) c = !c; } return c; }
  const treePos = [];
  let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < (coarse ? 900 : 1600); i++) {
    const x = (rnd() - .5) * 1100, y = (rnd() - .5) * 1400;
    if (pointInPoly(x, y, GEO.site)) continue;
    const dLine = Math.abs((b2[1] - b1[1]) * x - (b2[0] - b1[0]) * y + b2[0] * b1[1] - b2[1] * b1[0]) / Math.hypot(b2[1] - b1[1], b2[0] - b1[0]);
    if (dLine < 18) continue;
    const near = Math.hypot(x - 5, y / 2.5) < 80; if (near && rnd() < .5) continue;
    treePos.push([x, y, 0.7 + rnd() * 1.1]);
  }
  // some trees inside lots (existing vegetation) along back boundaries
  GEO.lots.forEach(l => { for (let k = 0; k < 1; k++) { const p = l.poly[Math.floor(rnd() * l.poly.length)]; const c = centroid(l.poly); const t = .25 + rnd() * .2; treePos.push([p[0] + (c[0] - p[0]) * t, p[1] + (c[1] - p[1]) * t, .5 + rnd() * .5]); } });
  const fol = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(3.4, 0), new THREE.MeshStandardMaterial({ color: 0x3f6a2f, roughness: 1, flatShading: true }), treePos.length);
  const trk = new THREE.InstancedMesh(new THREE.CylinderGeometry(.3, .45, 4, 5), new THREE.MeshStandardMaterial({ color: 0x5a4030 }), treePos.length);
  const dummy = new THREE.Object3D(), tc = new THREE.Color();
  treePos.forEach(([x, y, s], i) => {
    const gy = 0;
    dummy.position.set(x, gy + 2 * s, -y); dummy.scale.set(s, s, s); dummy.rotation.set(0, rnd() * 6, 0); dummy.updateMatrix(); trk.setMatrixAt(i, dummy.matrix);
    dummy.position.set(x, gy + 5.4 * s, -y); dummy.scale.set(s * (1 + rnd() * .4), s * (.9 + rnd() * .5), s * (1 + rnd() * .4)); dummy.updateMatrix(); fol.setMatrixAt(i, dummy.matrix);
    tc.setHSL(.24 + rnd() * .08, .38 + rnd() * .2, .22 + rnd() * .12); fol.setColorAt(i, tc);
  });
  fol.castShadow = true; trk.castShadow = true; scene.add(fol, trk);
  // fix tree heights to terrain
  (function settle() { const m = new THREE.Matrix4(), p = new THREE.Vector3(), q = new THREE.Quaternion(), s = new THREE.Vector3();
    for (let i = 0; i < treePos.length; i++) { const [x, y] = treePos[i]; const gy = groundY(x, -y);
      for (const im of [trk, fol]) { im.getMatrixAt(i, m); m.decompose(p, q, s); p.y += gy; m.compose(p, q, s); im.setMatrixAt(i, m); } }
    trk.instanceMatrix.needsUpdate = fol.instanceMatrix.needsUpdate = true; })();

  // "Imagina tu casa" volumetrías
  const houses = new THREE.Group(); houses.visible = false; scene.add(houses);
  const wall = new THREE.MeshStandardMaterial({ color: 0xf2ece0, roughness: .7 }), roofM = new THREE.MeshStandardMaterial({ color: 0x5a3e2b, roughness: .6 }), glass = new THREE.MeshStandardMaterial({ color: 0x8fb4c4, roughness: .1, metalness: .3, emissive: 0xffc77a, emissiveIntensity: 0 });
  GEO.lots.forEach(l => {
    const c = centroid(l.poly);
    // principal axis
    let sxx = 0, syy = 0, sxy = 0; l.poly.forEach(p => { const dx = p[0] - c[0], dy = p[1] - c[1]; sxx += dx * dx; syy += dy * dy; sxy += dx * dy; });
    const th = .5 * Math.atan2(2 * sxy, sxx - syy);
    const h = new THREE.Group(); h.position.set(c[0], .6, -c[1]); h.rotation.y = th;
    const a = new THREE.Mesh(new THREE.BoxGeometry(14, 3.4, 9), wall); a.position.y = 1.7; a.castShadow = true; h.add(a);
    const r = new THREE.Mesh(new THREE.BoxGeometry(16, .4, 11), roofM); r.position.y = 3.6; r.castShadow = true; h.add(r);
    const g = new THREE.Mesh(new THREE.BoxGeometry(10, 2.2, .1), glass); g.position.set(0, 1.5, 4.55); h.add(g);
    const p = new THREE.Mesh(new THREE.BoxGeometry(8, .15, 3.5), poolMat); p.position.set(-1, .1, 8); h.add(p);
    h.scale.setScalar(.001); h.userData.target = 1; houses.add(h);
  });

  // ---------- sizing & loop ----------
  function resize() { const w = stage.clientWidth, h = stage.clientHeight; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); }
  new ResizeObserver(resize).observe(stage); resize();
  let visible = false; new IntersectionObserver(e => { visible = e[0].isIntersecting; if (visible && !introDone) flyIn(); }, { threshold: .15 }).observe(stage);

  camera.position.set(420, 380, 520); controls.update();
  let introDone = false;
  function flyIn() {
    introDone = true; const to = { x: 210, y: 170, z: 230 };
    if (!window.gsap || reduce) { camera.position.set(to.x, to.y, to.z); return; }
    gsap.to(camera.position, { ...to, duration: 3.2, ease: 'power3.inOut' });
  }

  // ---------- interaction ----------
  const ray = new THREE.Raycaster(), mouse = new THREE.Vector2(); let hover = null, selected = null;
  const tip = $('#tip');
  function pick(ev) { const r = canvas.getBoundingClientRect(); mouse.set(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1); ray.setFromCamera(mouse, camera); const h = ray.intersectObjects(lotMeshes, false)[0]; return h ? h.object : null; }
  function setHover(m, ev) {
    if (hover && hover !== selected) { hover.material.emissive.setHex(0); gsap && gsap.to(hover.position, { y: hover.userData.baseY, duration: .3 }); }
    hover = m; canvas.style.cursor = m ? 'pointer' : 'grab';
    if (m) { if (m !== selected) { m.material.emissive.setHex(0x3a2a08); window.gsap && gsap.to(m.position, { y: 1.2, duration: .35, ease: 'back.out(2)' }); }
      const r = stage.getBoundingClientRect(); tip.style.left = (ev.clientX - r.left) + 'px'; tip.style.top = (ev.clientY - r.top) + 'px'; tip.innerHTML = `<b>${I18N.lot} ${m.userData.id}</b>${m.userData.area} m² · ${STATUS_TXT[m.userData.status]}`; tip.style.opacity = 1;
    } else tip.style.opacity = 0;
  }
  canvas.addEventListener('pointermove', ev => { if (ev.pointerType === 'touch') return; const m = pick(ev); if (m !== hover) setHover(m, ev); else if (m) { const r = stage.getBoundingClientRect(); tip.style.left = (ev.clientX - r.left) + 'px'; tip.style.top = (ev.clientY - r.top) + 'px'; } });
  canvas.addEventListener('pointerleave', () => setHover(null));
  let downAt = null; canvas.addEventListener('pointerdown', e => downAt = [e.clientX, e.clientY]);
  canvas.addEventListener('pointerup', e => { if (!downAt || Math.hypot(e.clientX - downAt[0], e.clientY - downAt[1]) > 6) return; if (coarse && !stage.classList.contains('interactive')) return; const m = pick(e); if (m) select(m.userData.id); });

  const panel = $('#panel');
  function select(id, fly = true) {
    const m = lotById[id]; if (!m) return;
    if (selected && selected !== m) { selected.material.emissive.setHex(0); window.gsap && gsap.to(selected.position, { y: selected.userData.baseY, duration: .4 }); }
    selected = m; m.material.emissive.setHex(0x5a400c); window.gsap && gsap.to(m.position, { y: 1.6, duration: .5, ease: 'back.out(2)' });
    controls.autoRotate = false; $('#tRotate').setAttribute('aria-pressed', 'false');
    const u = m.userData; $('#pNum').textContent = u.id; $('#pArea').textContent = u.area.toLocaleString(LOCALE) + ' m²';
    const pill = $('#pStatus'); pill.className = 'pill ' + u.status; pill.textContent = STATUS_TXT[u.status];
    $('#pSide').textContent = sideOf(u.id); $('#pPrice').textContent = CONFIG.precioM2 ? money(u.area * CONFIG.precioM2) : I18N.ask;
    $('#pFront').textContent = u.id >= 14 && u.id <= 19 ? I18N.front.south : I18N.front.road;
    $('#pNote').textContent = u.id === 1 ? I18N.note.gate : (u.id >= 19 && u.id <= 22) ? I18N.note.common : u.id >= 14 && u.id <= 18 ? I18N.note.south : I18N.note.mid;
    if (CONFIG.precioM2) $('#pNote').textContent += fill(I18N.note.price, { p: (LOCALE === 'es-CO' ? '$' : '') + CONFIG.precioM2.toLocaleString(LOCALE) }) + (I18N.note.usd && usd(u.area * CONFIG.precioM2) ? fill(I18N.note.usd, { v: usd(u.area * CONFIG.precioM2) }) : '');
    const cta = $('#pCta'); cta.textContent = u.status === 'vendido' ? I18N.ctaSold : I18N.ctaInterest;
    panel.classList.add('open');
    document.querySelectorAll('#lotStrip button').forEach(b => b.classList.toggle('on', +b.dataset.id === id));
    if (fly) focusOn(u.c);
  }
  function focusOn(c) {
    const tgt = new THREE.Vector3(c[0], 0, -c[1]);
    const dir = camera.position.clone().sub(controls.target).normalize(); dir.y = Math.max(dir.y, .55); dir.normalize();
    const pos = tgt.clone().add(dir.multiplyScalar(stage.clientWidth < 700 ? 150 : 110));
    if (window.gsap && !reduce) { gsap.to(controls.target, { x: tgt.x, y: tgt.y, z: tgt.z, duration: 1.4, ease: 'power3.inOut' }); gsap.to(camera.position, { x: pos.x, y: pos.y, z: pos.z, duration: 1.4, ease: 'power3.inOut' }); }
    else { controls.target.copy(tgt); camera.position.copy(pos); }
  }
  closePanel = window.PDS.closePanel = () => { panel.classList.remove('open'); if (selected) { selected.material.emissive.setHex(0); window.gsap && gsap.to(selected.position, { y: selected.userData.baseY, duration: .4 }); selected = null; } document.querySelectorAll('#lotStrip button').forEach(b => b.classList.remove('on')); };
  $('#pClose').onclick = closePanel;
  $('#pPrev').onclick = () => select(selected ? (selected.userData.id + 25) % 27 + 1 : 1);
  $('#pNext').onclick = () => select(selected ? selected.userData.id % 27 + 1 : 1);
  $('#pCta').addEventListener('click', () => { if (selected && selected.userData.status !== 'vendido') window.preselectLot(selected.userData.id); });

  // lot strip
  const strip = $('#lotStrip');
  strip.querySelectorAll('button').forEach(b => b.onclick = () => { stage.classList.add('interactive'); controls.enabled = true; select(+b.dataset.id); });

  // touch gate
  $('#gate').onclick = () => { stage.classList.add('interactive'); controls.enabled = true; };

  // tools
  const tool = id => $(id);
  tool('#tRotate').onclick = e => { controls.autoRotate = !controls.autoRotate; e.currentTarget.setAttribute('aria-pressed', controls.autoRotate); };
  tool('#tAerial').onclick = e => {
    const on = e.currentTarget.getAttribute('aria-pressed') !== 'true'; e.currentTarget.setAttribute('aria-pressed', on);
    const pos = on ? { x: 0.1, y: 520, z: 1 } : { x: 210, y: 170, z: 230 };
    controls.autoRotate = false; tool('#tRotate').setAttribute('aria-pressed', 'false');
    if (window.gsap) { gsap.to(controls.target, { x: 5, y: 0, z: 0, duration: 1.6, ease: 'power3.inOut' }); gsap.to(camera.position, { ...pos, duration: 1.6, ease: 'power3.inOut' }); } else { camera.position.set(pos.x, pos.y, pos.z); controls.target.set(5, 0, 0); }
  };
  let night = false;
  tool('#tNight').onclick = e => { night = !night; e.currentTarget.setAttribute('aria-pressed', night); applyMood(night ? NIGHT : DAY, night); };
  function applyMood(M, isNight) {
    const o = { t: 0 }; const fogA = scene.fog.color.clone(), fogB = new THREE.Color(M.fog), tA = skyU.top.value.clone(), tB = new THREE.Color(M.skyTop), bA = skyU.bot.value.clone(), bB = new THREE.Color(M.skyBot), sA = sun.color.clone(), sB = new THREE.Color(M.sunCol);
    const h0 = hemi.intensity, s0 = sun.intensity, e0 = renderer.toneMappingExposure, l0 = lampMat.emissiveIntensity, st0 = stars.material.opacity;
    const upd = () => { const t = o.t; scene.fog.color.copy(fogA).lerp(fogB, t); skyU.top.value.copy(tA).lerp(tB, t); skyU.bot.value.copy(bA).lerp(bB, t); sun.color.copy(sA).lerp(sB, t);
      hemi.intensity = h0 + (M.hemi - h0) * t; sun.intensity = s0 + (M.sun - s0) * t; renderer.toneMappingExposure = e0 + (M.exp - e0) * t;
      const L = isNight ? 3 : 0; lampMat.emissiveIntensity = l0 + (L - l0) * t; lampLights.forEach(p => p.intensity = (isNight ? 2.2 : 0) * t + p.intensity * (1 - t));
      winMat.emissiveIntensity = glass.emissiveIntensity = lampMat.emissiveIntensity * .6; poolMat.emissiveIntensity = isNight ? .4 + 1.6 * t : .4; stars.material.opacity = st0 + ((isNight ? .9 : 0) - st0) * t;
      stage.style.background = '#' + scene.fog.color.getHexString(); };
    if (window.gsap && !reduce) gsap.to(o, { t: 1, duration: 1.6, ease: 'power2.inOut', onUpdate: upd }); else { o.t = 1; upd(); }
  }
  tool('#tHouses').onclick = e => {
    const on = e.currentTarget.getAttribute('aria-pressed') !== 'true'; e.currentTarget.setAttribute('aria-pressed', on);
    if (on) houses.visible = true;
    houses.children.forEach((h, i) => { const s = on ? 1 : .001; if (window.gsap && !reduce) gsap.to(h.scale, { x: s, y: s, z: s, duration: .7, delay: (on ? i : 26 - i) * .035, ease: on ? 'back.out(1.6)' : 'power2.in', onComplete: () => { if (!on && i === 0) houses.visible = false; } }); else { h.scale.setScalar(s); houses.visible = on; } });
  };
  // guided tour along the road
  let touring = null;
  tool('#tTour').onclick = e => {
    const btn = e.currentTarget;
    if (touring) { touring.kill(); touring = null; btn.setAttribute('aria-pressed', 'false'); controls.enabled = !coarse || stage.classList.contains('interactive'); return; }
    if (!window.gsap) return;
    closePanel(); controls.autoRotate = false; tool('#tRotate').setAttribute('aria-pressed', 'false'); btn.setAttribute('aria-pressed', 'true'); controls.enabled = false;
    const [a, b] = GEO.roadLine, d = GEO.diagLine;
    const pts = [[a[0] + 30, a[1] + 70, 40], [a[0], a[1] - 5, 9], [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, 8], [cc[0] - 6, cc[1] + 12, 10], [b[0], b[1] + 20, 9], [d[1][0], d[1][1] + 4, 14], [5, -140, 120]];
    const look = [[a[0], a[1] - 30], [b[0], b[1]], [b[0], b[1]], [cc[0], cc[1]], [d[1][0], d[1][1]], [d[0][0], d[0][1]], [5, 0]];
    touring = gsap.timeline({ onComplete: () => { touring = null; btn.setAttribute('aria-pressed', 'false'); controls.enabled = !coarse || stage.classList.contains('interactive'); } });
    pts.forEach((p, i) => { const dur = i === 0 ? 2 : 3.2;
      touring.to(camera.position, { x: p[0], y: p[2], z: -p[1], duration: dur, ease: 'sine.inOut' }, i === 0 ? 0 : '>');
      touring.to(controls.target, { x: look[i][0], y: 2, z: -look[i][1], duration: dur, ease: 'sine.inOut' }, '<'); });
  };

  // compass + loop
  const compass = $('#compass');
  function loop() {
    requestAnimationFrame(loop);
    if (!visible) return;
    controls.update();
    const az = Math.atan2(camera.position.x - controls.target.x, camera.position.z - controls.target.z);
    compass.style.transform = `rotate(${az * 180 / Math.PI}deg)`;
    renderer.render(scene, camera);
  }
  loop();
})();
