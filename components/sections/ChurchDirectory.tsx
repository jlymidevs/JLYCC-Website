"use client";

import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { MapPin, Search, Globe, Flag, ChevronDown, X, Navigation, ExternalLink, Users } from "lucide-react";

type Church = {
  name: string;
  pastor: string;
  address: string;
  flag?: string;
  fb?: string;
};

type Region = {
  name: string;
  count: number;
  flag: string;
  churches: Church[];
};

const internationalRegions: Region[] = [
  {
    name: "Asia", count: 7, flag: "🌏",
    churches: [
      { name: "Hong Kong", pastor: "Pastor Zoe Ulit", address: "Rm 22 Kwan Yick Building Phase 2, 343 Des Voeux Road West, Hong Kong", flag: "🇭🇰" },
      { name: "Kota Kinabalu", pastor: "Pastor Anthony Gernale", address: "Lot 2.3, 2nd Floor, Komplek Asia City, Jalan Asia City, 88000 Kota Kinabalu, Sabah, Malaysia", flag: "🇲🇾" },
      { name: "Abu Dhabi (UAE)", pastor: "", address: "", flag: "🇦🇪" },
      { name: "Dubai (UAE)", pastor: "", address: "", flag: "🇦🇪" },
      { name: "Seoul (South Korea)", pastor: "", address: "", flag: "🇰🇷" },
      { name: "Singapore", pastor: "", address: "", flag: "🇸🇬" },
      { name: "Tokyo (Japan)", pastor: "", address: "", flag: "🇯🇵" },
    ],
  },
  {
    name: "Australia & Oceania", count: 3, flag: "🌏",
    churches: [
      { name: "Australia", pastor: "Pastor Ronnie Gilua", address: "Unit 1/123 Dixon Road, East Rockingham, Western Australia", flag: "🇦🇺" },
      { name: "Melbourne (Australia)", pastor: "", address: "", flag: "🇦🇺" },
      { name: "Sydney (Australia)", pastor: "", address: "", flag: "🇦🇺" },
    ],
  },
  {
    name: "Europe", count: 6, flag: "🌍",
    churches: [
      { name: "Italy", pastor: "Pastor Arturo Bermudez", address: "Via Luigi Abbiati 18/A, Brescia, Italy", flag: "🇮🇹" },
      { name: "Barcelona (Spain)", pastor: "", address: "", flag: "🇪🇸" },
      { name: "London (UK)", pastor: "", address: "", flag: "🇬🇧" },
      { name: "Madrid (Spain)", pastor: "", address: "", flag: "🇪🇸" },
      { name: "Milan (Italy)", pastor: "", address: "", flag: "🇮🇹" },
      { name: "Rome (Italy)", pastor: "", address: "", flag: "🇮🇹" },
    ],
  },
  {
    name: "North America", count: 5, flag: "🌎",
    churches: [
      { name: "USA / HWM", pastor: "Pastor Philip Bautista", address: "5600 Orangethorpe Unit 2701, La Palma, California 90623", flag: "🇺🇸" },
      { name: "Los Angeles (USA)", pastor: "", address: "", flag: "🇺🇸" },
      { name: "New York (USA)", pastor: "", address: "", flag: "🇺🇸" },
      { name: "Toronto (Canada)", pastor: "", address: "", flag: "🇨🇦" },
      { name: "Vancouver (Canada)", pastor: "", address: "", flag: "🇨🇦" },
    ],
  },
];

const nationalRegions: Region[] = [
  {
    name: "NCRST", count: 8, flag: "🇵🇭",
    churches: [
      { name: "JLYCC Dasmañas", pastor: "Pastor Vivian O. Adarle", address: "B106 L008 Brgy. Sta. Lucia, Dasmariñas City, Cavite", fb: "https://www.facebook.com/jlycc.dasmarinas.9" },
      { name: "JLYCC Marikina", pastor: "Pastor Elmer R. Gaurano", address: "274 General Ordóñez Avenue, Marikina Heights, Marikina City", fb: "https://www.facebook.com/jlycc.marikina" },
      { name: "JLYCC Commonwealth", pastor: "Pastor Nanette B. Gaurano", address: "17 Villongco St., Commonwealth, Quezon City", fb: "https://www.facebook.com/jlycc.commonwealth" },
      { name: "JLYCC Imus", pastor: "Pastor Gerundio A. Medrano Jr.", address: "175 Daang Hari Blvd., Brgy. Pasong Buaya 1, Imus, Cavite", fb: "https://www.facebook.com/jlyccimus" },
      { name: "JLYCC Jala-Jala", pastor: "Pastor Melquisedec D. Aguirre", address: "161 Sitio Dalig 3rd St. District, Jala-Jala", fb: "https://www.facebook.com/jlyccjalajala" },
      { name: "JLYCC GMA", pastor: "Pastor Victor D. Eguia", address: "Luzon Avenue, Brgy. Maderan, GMA, Cavite", fb: "https://www.facebook.com/jlycc.gma" },
      { name: "JLYCC San Pedro", pastor: "Pastor Victor D. Eguia", address: "#2 San Jose St., Ph. 2 Pacita 1, San Pedro, Laguna", fb: "https://www.facebook.com/jlycc.sanpedro" },
      { name: "JLYCC Antipolo", pastor: "Pastor Paul S. Ramos", address: "#94 Marcos Highway, Brgy. Bagong Nayon, Antipolo, Rizal", fb: "https://www.facebook.com/jlycc.antipolo" },
    ],
  },
  {
    name: "Region 1, 3 & CAR", count: 8, flag: "🇵🇭",
    churches: [
      { name: "JLYCC Olongapo", pastor: "Pastor Antonio Ariola Jr.", address: "99 Gordon Avenue, New Kalalake, Olongapo City", fb: "https://www.facebook.com/jlycc.olongapo" },
      { name: "JLYCC Bataan", pastor: "Pastor Josephine M. Ariola", address: "Roosevelt, Dinalupihan, Bataan" },
      { name: "JLYCC San Fernando", pastor: "Pastor Antonio Ariola Jr.", address: "3rd Floor CTH Bldg., Brgy. Dolores, San Fernando, Pampanga", fb: "https://www.facebook.com/jlycc.sanfernando" },
      { name: "JLYCC Urdaneta", pastor: "Pastor Ryan Madrona", address: "Alonzo St., Poblacion, Urdaneta City" },
      { name: "JLYCC Cabanatuan", pastor: "Pastor Roberto Apan", address: "Menrium Mabini Homesite, Cabanatuan City, Nueva Ecija", fb: "https://www.facebook.com/jlycc.cabanatuan" },
      { name: "JLYCC San Jose", pastor: "Pastor Ricardo A. Fugaban Jr.", address: "1851 Maharlika Highway, Abar 1st, San Jose City", fb: "https://www.facebook.com/jly.sanjose" },
      { name: "JLYCC Castillejos", pastor: "Pastor Ferdinand T. Bermudez", address: "St. Martin Subd., Purok 1, Brgy. Del Pilar, Castillejos, Zambales", fb: "https://www.facebook.com/jlycc.castillejos" },
      { name: "JLYCC Baguio", pastor: "Pastor Dave Keneth S. Cachola", address: "#19 Aspiras-Palispis Highway, Baguio City 2600", fb: "https://www.facebook.com/JLYCC.Baguio" },
    ],
  },
  {
    name: "Visayas", count: 7, flag: "🇵🇭",
    churches: [
      { name: "JLYCC Iloilo", pastor: "Pastor Reymar C. Macavinta", address: "3rd Floor JEA 2 Bldg., E. Lopez St., Brgy. Our Lady of Fatima, Jaro, Iloilo City" },
      { name: "JLYCC Leyte", pastor: "Pastor Amorlina L. Elviña", address: "Nahaong, Libagon, Southern Leyte", fb: "https://www.facebook.com/jlycc.leyte" },
      { name: "JLYCC Pres Roxas Capiz", pastor: "Pastor Elizabeth S. Dinglasan", address: "Swa D, Poblacion Elizalde, Pres. Roxas, Capiz" },
      { name: "JLYCC Talisay", pastor: "Pastor Lilibeth C. Leoligao", address: "Reycar Bldg., Lower Mohon, Talisay City, Cebu" },
      { name: "JLYCC Lapu-Lapu - Cebu", pastor: "Pastor Katherine M. Jayoma", address: "3rd Floor CEP Building, Osmeña St., Gun-Ob, Lapu-Lapu City", fb: "https://www.facebook.com/Jlycclapulapu" },
      { name: "JLYCC Naga - Cebu", pastor: "Pastor Germaine Tejada", address: "Relocation Street, Brgy. Tinaan, Naga City, Cebu", fb: "https://www.facebook.com/jly.naga" },
      { name: "JLYCC Cebu", pastor: "Pastor Maria Luisa G. Martinez", address: "No. 9 V. Rama St., Brgy. Calamba, Cebu City", fb: "https://www.facebook.com/jlycccebu" },
    ],
  },
  {
    name: "Reg. 9-12", count: 5, flag: "🇵🇭",
    churches: [
      { name: "JLYCC CDO", pastor: "Pastor Haidee G. Ponce", address: "Enchanted Kingdom Road, Upper Canitoan, Cagayan de Oro City" },
      { name: "JLYCC Davao", pastor: "Pastor Christopher James Daway", address: "#16 Hilldrive, Bajada, Davao City", fb: "https://www.facebook.com/jlycc.davao" },
      { name: "JLYCC General Santos City", pastor: "Pastor Romeo A. Bermudez", address: "Blk 20 Lot 23 Phase IIB, Doña Soledad Subd., Labangal, Gen. Santos City", fb: "https://www.facebook.com/jlycc.gensan" },
      { name: "JLYCC Iligan", pastor: "Pastor Adonijah V. Ligtas", address: "Rosal A, Brgy. Villaverde, Iligan City", fb: "https://www.facebook.com/jlycc.iligan" },
      { name: "JLYCC Sto. Tomas", pastor: "Pastor Roselyn Rillera", address: "Fd. Rd 1, Sto. Tomas, Davao del Norte" },
    ],
  },
  {
    name: "Caraga Region", count: 10, flag: "🇵🇭",
    churches: [
      { name: "JLYCC Butuan City", pastor: "Pastor Ronnell C. Giray", address: "3rd Floor Gloria Bldg., R. Calo St., San Ignacio, Butuan City, Agusan del Norte", fb: "https://www.facebook.com/jlycc.butuan" },
      { name: "JLYCC Cantilan", pastor: "Pastor Cerina L. Plaza", address: "Magosilom, Cantilan, Surigao del Sur", fb: "https://www.facebook.com/jlycc.cantilan" },
      { name: "JLYCC Gamut", pastor: "Pastor Charrie D. Bataluna", address: "Purok Bombils, Gamut, Tago, Surigao del Sur 8302", fb: "https://www.facebook.com/jlycc.gamut" },
      { name: "JLYCC Gingoog City", pastor: "Pastor Estela V. Basadre", address: "Tuto St., Brgy. 17, Gingoog City", fb: "https://www.facebook.com/JLYGingoog" },
      { name: "JLYCC Lindoy", pastor: "Pastor Joey Emboy", address: "Purok African Daisy, Brgy. Lindoy, Tago, Surigao del Sur" },
      { name: "JLYCC Nasipit", pastor: "Pastor Jocelyn E. Padre", address: "602 Fuertes Street, Purok Bougainvilla, Barangay 3, Nasipit, Agusan del Norte" },
      { name: "JLYCC Panaosawon", pastor: "Pastor Frejoy Bataluna", address: "Purok 2, Brgy. Panasawon, Bayabas, Surigao del Sur" },
      { name: "JLYCC Sta. Ana", pastor: "Pastor Roselyn Sumalylo", address: "District Lahi, Sta. Ana, Agusan del Norte", fb: "https://www.facebook.com/jly.sta.ana" },
      { name: "JLYCC Tandag", pastor: "Pastor Dionesio Antivo", address: "Brgy. Victoria, Crossing, Tandag City" },
      { name: "JLYCC Kibungsod", pastor: "Pastor Juluis Verterra", address: "Prk. Paghiusa, Kibungsod, Magsaysay, Misamis Oriental" },
    ],
  },
  {
    name: "Region 2", count: 12, flag: "🇵🇭",
    churches: [
      { name: "JLYCC Bagabag", pastor: "Pastor Kim C. Eviota", address: "Purok 3 Amethyst Subdivision, Bagabag, Nueva Vizcaya" },
      { name: "JLYCC Bambang", pastor: "Pastor Nathaniel Flores", address: "24 Fe St., Banggot Poblacion, Bambang, Nueva Vizcaya", fb: "https://www.facebook.com/JLYCCBambang" },
      { name: "JLYCC Cauayan", pastor: "Pastor Joseph S. Gamal", address: "ESTC Building, 2nd Floor, Door 7, Burgos Street, District 2, Cauayan City, Isabela", fb: "https://www.facebook.com/JLYCauayan" },
      { name: "JLYCC Curifang", pastor: "Pastor Roy Q. Salazar", address: "Blk. 7, Perez Village, Curifang, Solano, Nueva Vizcaya" },
      { name: "JLYCC Diffun", pastor: "Pastor Josefa Gallon", address: "Barangay Aurora West, Diffun, Quirino", fb: "https://www.facebook.com/jlyccdiffun" },
      { name: "JLYCC Echague", pastor: "Pastor Lanie C. Vera Cruz", address: "Purok 1, Libertad, Echague, Isabela", fb: "https://www.facebook.com/jlycc.echague" },
      { name: "JLYCC Lamut", pastor: "Pastor Joemar S. Mercado", address: "Sozimo Paredes Ave., Hapid Road, Poblacion East, Lamut, Ifugao", fb: "https://www.facebook.com/jlycc.lamut" },
      { name: "JLYCC Roxas", pastor: "Pastor Joselito Mendoza", address: "2nd Floor Grelinda Bldg., Taganas St., Brgy. Vira, Roxas, Isabela" },
      { name: "JLYCC Santiago", pastor: "Pastor Desiderio R. Gallon Jr.", address: "Ancheta Extension, Purok 4, Mabini, Santiago City", fb: "https://www.facebook.com/JLYCC.Santiago" },
      { name: "JLYCC Solano", pastor: "Pastor Roy Q. Salazar", address: "National Highway, Purok 1, Bascaran, Solano, Nueva Vizcaya", fb: "https://www.facebook.com/jlycc.solano" },
      { name: "JLYCC Tucal", pastor: "Pastor Roy Q. Salazar", address: "Blk. 4, Tucal, Solano, Nueva Vizcaya" },
      { name: "JLYCC Villaverde N.V.", pastor: "Pastor Samuel Tamtamoy", address: "Brgy. Ibung, Villaverde, Nueva Vizcaya" },
    ],
  },
  {
    name: "Pioneering", count: 8, flag: "🇵🇭",
    churches: [
      { name: "JLYCC Manila (Baseco)", pastor: "Pastor Junlie Lozada", address: "1-2 Blk 5 Unilever Village, Gawad Kalinga" },
      { name: "Bayumbong N.V.", pastor: "Pastor Lorelie Fabro", address: "4th Floor Mondiguing Bldg., Cabarroguis St., Brgy. Don Mariano Marcos, Bayombong, Nueva Vizcaya" },
      { name: "JLYCC Camalaniugan", pastor: "Pastor Gideon Gamal", address: "Zone 7, Brgy. Catotoran Norte, Camalaniugan, Cagayan" },
      { name: "JLYCC Quezon N.V.", pastor: "Pastor Roy Salazar", address: "Brgy. Boliwao, Quezon, Nueva Vizcaya" },
      { name: "JLYCC Roxas Capiz", pastor: "Pastor Adrian Dale Fufunan", address: "Lakandula St., Roxas City, Capiz", fb: "https://www.facebook.com/jly.roxas.capiz" },
      { name: "JLYCC Cabadbaran City", pastor: "Pastor Carlito Ducena", address: "Ojeda Ave., Purok 5, Brgy. 9, Cabadbaran City" },
      { name: "JLYCC Bugsukan", pastor: "Pastor Delvin G. Oraiz", address: "Brgy. Bugsukan, Butuan City, Agusan del Norte" },
      { name: "JLYCC New Dapitan", pastor: "Pastor Rio T. Atil", address: "Purok 1, Brgy. New Dapitan, Tampilisan, Zamboanga del Norte", fb: "https://www.facebook.com/jlycc.newdapitan" },
    ],
  },
];

const allRegions = [...internationalRegions, ...nationalRegions];

const totalChurches = allRegions.reduce((s, r) => s + r.count, 0);
const totalCountries = 21;
const totalRegions = allRegions.length;

function gmapsUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

function AnimatedCounter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const step = Math.ceil(to / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, to]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0); y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function RegionCard({ region, index, isOpen, onToggle }: {
  region: Region; index: number; isOpen: boolean; onToggle: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <TiltCard className="h-full">
        <div
          className={`rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer group
            ${isOpen
              ? "border-teal-400 shadow-xl shadow-teal-500/20"
              : "border-teal-300/40 dark:border-teal-700/40 hover:border-teal-400 hover:shadow-lg hover:shadow-teal-500/10"
            }`}
          style={{ transformStyle: "preserve-3d" }}
          onClick={onToggle}
        >
          <div className={`relative overflow-hidden px-5 py-4 transition-all duration-300
            ${isOpen ? "bg-teal-500" : "bg-gradient-to-br from-teal-500 to-teal-600 group-hover:from-teal-400 group-hover:to-teal-500"}`}
          >
            <motion.div
              className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-white/10"
              animate={{ scale: isOpen ? 2 : 1 }}
              transition={{ duration: 0.4 }}
            />
            <motion.div
              className="absolute -bottom-6 -left-2 w-14 h-14 rounded-full bg-white/5"
              animate={{ scale: isOpen ? 1.5 : 1 }}
              transition={{ duration: 0.4 }}
            />

            <div className="relative flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-xl shrink-0">{region.flag}</span>
                <div className="min-w-0">
                  <div className="font-heading font-black text-white text-sm leading-tight truncate">{region.name}</div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Users size={10} className="text-white/70 shrink-0" />
                    <span className="text-white/70 text-xs font-semibold">{region.count} churches</span>
                  </div>
                </div>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="shrink-0"
              >
                <ChevronDown size={16} className="text-white" />
              </motion.div>
            </div>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden bg-white dark:bg-gray-800"
              >
                <div className="max-h-64 overflow-y-auto divide-y divide-gray-50 dark:divide-gray-700/60">
                  {region.churches.map((church, ci) => (
                    <motion.div
                      key={church.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: ci * 0.04 }}
                      className="px-4 py-3 hover:bg-teal-50/60 dark:hover:bg-teal-900/10 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-0.5">
                        {church.flag && <span className="text-sm">{church.flag}</span>}
                        <span className="font-semibold text-gray-900 dark:text-white text-sm leading-snug">{church.name}</span>
                      </div>
                      {church.pastor && (
                        <p className="text-teal-500 dark:text-teal-400 text-xs font-medium pl-0.5 italic mb-1">{church.pastor}</p>
                      )}
                      <div className="flex items-center gap-3">
                        {church.address && (
                          <a
                            href={gmapsUrl(church.address)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="text-blue-500 hover:text-blue-700 text-xs flex items-center gap-1 hover:underline"
                          >
                            <MapPin size={9} /> Map
                          </a>
                        )}
                        {church.fb && (
                          <a
                            href={church.fb}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="text-teal-500 hover:text-teal-700 text-xs flex items-center gap-1 hover:underline font-semibold"
                          >
                            <ExternalLink size={9} /> Facebook
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </TiltCard>
    </motion.div>
  );
}

function SearchCard({ church, regionName, index }: { church: Church; regionName: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-2 mb-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-teal-500 mt-1 shrink-0" />
          <span className="font-bold text-gray-900 dark:text-white text-sm leading-snug">
            {church.flag && `${church.flag} `}{church.name}
          </span>
        </div>
        <span className="text-xs font-semibold text-teal-600 bg-teal-50 dark:bg-teal-900/30 dark:text-teal-300 border border-teal-100 dark:border-teal-700 px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
          {regionName}
        </span>
      </div>
      {church.pastor && <p className="text-teal-500 text-xs font-medium mb-1 pl-4 italic">{church.pastor}</p>}
      <div className="flex items-center gap-3 pl-4">
        {church.address && (
          <a href={gmapsUrl(church.address)} target="_blank" rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 text-xs flex items-center gap-1 hover:underline">
            <MapPin size={9} /> Directions
          </a>
        )}
        {church.fb && (
          <a href={church.fb} target="_blank" rel="noopener noreferrer"
            className="text-teal-500 hover:text-teal-700 text-xs flex items-center gap-1 hover:underline font-semibold">
            <ExternalLink size={9} /> Facebook
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function ChurchDirectory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });
  const [activeIntl, setActiveIntl] = useState<string | null>(null);
  const [activeNat, setActiveNat] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false);

  const q = search.toLowerCase().trim();
  const searchResults = q
    ? allRegions.flatMap(r =>
        r.churches
          .filter(c =>
            c.name.toLowerCase().includes(q) ||
            c.pastor?.toLowerCase().includes(q) ||
            c.address?.toLowerCase().includes(q)
          )
          .map(c => ({ church: c, regionName: r.name }))
      )
    : [];

  const statsVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section
      id="directories"
      className="py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden"
      aria-labelledby="directory-heading"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-teal-400/5 dark:bg-teal-400/10 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-teal-300/5 dark:bg-teal-500/10 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container-section" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10"
        >
          <motion.span
            className="inline-block text-xs font-black tracking-widest uppercase text-teal-500 mb-2"
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={isInView ? { opacity: 1, letterSpacing: "0.3em" } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            OUR LOCATIONS
          </motion.span>
          <h2 id="directory-heading" className="font-heading text-4xl md:text-5xl font-black text-gray-900 dark:text-white mt-2">
            CHURCH DIRECTORY
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
            Join a JLYCC family near you - a growing movement spanning the Philippines and the globe.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mb-12">
          {[
            { value: totalChurches, suffix: "+", label: "Churches" },
            { value: totalCountries, suffix: "+", label: "Countries" },
            { value: totalRegions, suffix: "", label: "Regions" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              variants={statsVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="relative group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 text-center shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <div className="font-heading text-3xl font-black text-teal-500 dark:text-teal-400 relative">
                  <AnimatedCounter to={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-xs font-semibold mt-1 uppercase tracking-wider relative">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <motion.div
            animate={{ scale: focused ? 1.01 : 1 }}
            transition={{ duration: 0.2 }}
            className="flex gap-3"
          >
            <div className="relative flex-1">
              <motion.div
                animate={{ color: focused ? "#2aa3b5" : "#9ca3af" }}
                className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
              >
                <Search size={18} />
              </motion.div>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Search churches, cities, pastors..."
                className="w-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl pl-12 pr-10 py-4 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm focus:outline-none focus:border-teal-500 transition-colors shadow-sm"
                aria-label="Search church locations"
              />
              <AnimatePresence>
                {search && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setSearch("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X size={16} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
            <a
              href="https://www.google.com/maps/search/JLYCC+church+near+me"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 active:scale-95 text-white font-bold text-sm px-5 py-4 rounded-2xl transition-all duration-200 whitespace-nowrap shadow-sm hover:shadow-teal-500/30 hover:shadow-lg"
            >
              <Navigation size={16} />
              Near Me
            </a>
          </motion.div>

          <AnimatePresence>
            {search && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-sm text-gray-500 dark:text-gray-400 mt-3 pl-1"
              >
                Found{" "}
                <motion.span
                  key={searchResults.length}
                  initial={{ scale: 1.3, color: "#2aa3b5" }}
                  animate={{ scale: 1 }}
                  className="font-bold text-teal-600 dark:text-teal-400"
                >
                  {searchResults.length}
                </motion.span>{" "}
                location{searchResults.length !== 1 ? "s" : ""}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence mode="wait">
          {search && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto mb-12"
            >
              {searchResults.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {searchResults.map(({ church, regionName }, i) => (
                    <SearchCard key={`${regionName}-${church.name}`} church={church} regionName={regionName} index={i} />
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="text-4xl mb-3">🔍</div>
                  <p className="text-gray-400 dark:text-gray-500 font-semibold">No churches found for &quot;{search}&quot;</p>
                  <p className="text-gray-400 dark:text-gray-600 text-sm mt-1">Try a city, region, or pastor name</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!search && (
            <motion.div
              key="directory"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mb-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex items-center gap-3 mb-6"
                >
                  <div className="w-9 h-9 bg-teal-500/10 dark:bg-teal-500/20 rounded-xl flex items-center justify-center">
                    <Globe size={18} className="text-teal-500" />
                  </div>
                  <h3 className="font-heading font-black text-gray-800 dark:text-white text-xl">International Churches</h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-teal-200 dark:from-teal-800 to-transparent" />
                </motion.div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {internationalRegions.map((region, i) => (
                    <RegionCard
                      key={region.name}
                      region={region}
                      index={i}
                      isOpen={activeIntl === region.name}
                      onToggle={() => setActiveIntl(activeIntl === region.name ? null : region.name)}
                    />
                  ))}
                </div>
              </div>

              <div className="mb-10">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.55 }}
                  className="flex items-center gap-3 mb-6"
                >
                  <div className="w-9 h-9 bg-teal-500/10 dark:bg-teal-500/20 rounded-xl flex items-center justify-center">
                    <Flag size={18} className="text-teal-500" />
                  </div>
                  <h3 className="font-heading font-black text-gray-800 dark:text-white text-xl">
                    National Churches <span className="ml-1">🇵🇭</span>
                  </h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-teal-200 dark:from-teal-800 to-transparent" />
                </motion.div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {nationalRegions.map((region, i) => (
                    <RegionCard
                      key={region.name}
                      region={region}
                      index={i}
                      isOpen={activeNat === region.name}
                      onToggle={() => setActiveNat(activeNat === region.name ? null : region.name)}
                    />
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-center"
              >
                <a
                  href="/find-a-church"
                  className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 active:scale-95 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 hover:shadow-lg hover:shadow-teal-500/30"
                >
                  <MapPin size={16} />
                  View Full Church Directory
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
