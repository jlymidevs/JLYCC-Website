"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Search, Globe, Flag, ChevronDown, X, Navigation } from "lucide-react";

type Church = { name: string; pastor: string; address: string; flag?: string; fb?: string; };
type Region = { name: string; count: number; flag: string; churches: Church[]; };

const internationalRegions: Region[] = [
  { name: "Asia", count: 7, flag: "🌏", churches: [
    { name: "Hong Kong", pastor: "Pastor Zoe Ulit", address: "Rm 22 Kwan Yick Building Phase 2, 343 Des Voeux Road West, Hong Kong", flag: "🇭🇰" },
    { name: "Kota Kinabalu", pastor: "Pastor Anthony Gernale", address: "Lot 2.3, 2nd Floor, Komplek Asia City, Jalan Asia City, 88000 Kota Kinabalu, Sabah, Malaysia", flag: "🇲🇾" },
    { name: "Abu Dhabi (UAE)", pastor: "", address: "", flag: "🇦🇪" },
    { name: "Dubai (UAE)", pastor: "", address: "", flag: "🇦🇪" },
    { name: "Seoul (South Korea)", pastor: "", address: "", flag: "🇰🇷" },
    { name: "Singapore", pastor: "", address: "", flag: "🇸🇬" },
    { name: "Tokyo (Japan)", pastor: "", address: "", flag: "🇯🇵" },
  ]},
  { name: "Australia & Oceania", count: 3, flag: "🌏", churches: [
    { name: "Australia", pastor: "Pastor Ronnie Gilua", address: "Unit 1/123 Dixon Road, East Rockingham, Western Australia", flag: "🇦🇺" },
    { name: "Melbourne (Australia)", pastor: "", address: "", flag: "🇦🇺" },
    { name: "Sydney (Australia)", pastor: "", address: "", flag: "🇦🇺" },
  ]},
  { name: "Europe", count: 6, flag: "🌍", churches: [
    { name: "Italy", pastor: "Pastor Arturo Bermudez", address: "Via Luigi Abbiati 18/A, Brescia, Italy", flag: "🇮🇹" },
    { name: "Barcelona (Spain)", pastor: "", address: "", flag: "🇪🇸" },
    { name: "London (UK)", pastor: "", address: "", flag: "🇬🇧" },
    { name: "Madrid (Spain)", pastor: "", address: "", flag: "🇪🇸" },
    { name: "Milan (Italy)", pastor: "", address: "", flag: "🇮🇹" },
    { name: "Rome (Italy)", pastor: "", address: "", flag: "🇮🇹" },
  ]},
  { name: "North America", count: 5, flag: "🌎", churches: [
    { name: "USA / HWM", pastor: "Pastor Philip Bautista", address: "5600 Orangethorpe Unit 2701, La Palma, California 90623", flag: "🇺🇸" },
    { name: "Los Angeles (USA)", pastor: "", address: "", flag: "🇺🇸" },
    { name: "New York (USA)", pastor: "", address: "", flag: "🇺🇸" },
    { name: "Toronto (Canada)", pastor: "", address: "", flag: "🇨🇦" },
    { name: "Vancouver (Canada)", pastor: "", address: "", flag: "🇨🇦" },
  ]},
];

const nationalRegions: Region[] = [
  { name: "NCRST", count: 8, flag: "🇵🇭", churches: [
    { name: "JLYCC Dasmañiras", pastor: "Pastor Vivian O. Adarle", address: "B106 L008 Brgy. Sta. Lucia, Dasmañiras City, Cavite", fb: "https://www.facebook.com/jlycc.dasmarinas.9" },
    { name: "JLYCC Marikina", pastor: "Pastor Elmer R. Gaurano", address: "274 General Ordoñez Avenue, Marikina Heights, Marikina City", fb: "https://www.facebook.com/jlycc.marikina" },
    { name: "JLYCC Commonwealth", pastor: "Pastor Nanette B. Gaurano", address: "17 Villongco St., Commonwealth, Quezon City", fb: "https://www.facebook.com/jlycc.commonwealth" },
    { name: "JLYCC Imus", pastor: "Pastor Gerundio A. Medrano Jr.", address: "175 Daang Hari Blvd., Brgy. Pasong Buaya 1, Imus, Cavite", fb: "https://www.facebook.com/jlyccimus" },
    { name: "JLYCC Jala-Jala", pastor: "Pastor Melquisedec D. Aguirre", address: "161 Sitio Dalig 3rd St. District, Jala-Jala", fb: "https://www.facebook.com/jlyccjalajala" },
    { name: "JLYCC GMA", pastor: "Pastor Victor D. Eguia", address: "Luzon Avenue, Brgy. Maderan, GMA, Cavite", fb: "https://www.facebook.com/jlycc.gma" },
    { name: "JLYCC San Pedro", pastor: "Pastor Victor D. Eguia", address: "#2 San Jose St., Ph. 2 Pacita 1, San Pedro, Laguna", fb: "https://www.facebook.com/jlycc.sanpedro" },
    { name: "JLYCC Antipolo", pastor: "Pastor Paul S. Ramos", address: "#94 Marcos Highway, Brgy. Bagong Nayon, Antipolo, Rizal", fb: "https://www.facebook.com/jlycc.antipolo" },
  ]},
  { name: "Region 1, 3 & CAR", count: 8, flag: "🇵🇭", churches: [
    { name: "JLYCC Olongapo", pastor: "Pastor Antonio Ariola Jr.", address: "99 Gordon Avenue, New Kalalake, Olongapo City", fb: "https://www.facebook.com/jlycc.olongapo" },
    { name: "JLYCC Bataan", pastor: "Pastor Josephine M. Ariola", address: "Roosevelt, Dinalupihan, Bataan" },
    { name: "JLYCC San Fernando", pastor: "Pastor Antonio Ariola Jr.", address: "3rd Floor CTH Bldg., Brgy. Dolores, San Fernando, Pampanga", fb: "https://www.facebook.com/jlycc.sanfernando" },
    { name: "JLYCC Urdaneta", pastor: "Pastor Ryan Madrona", address: "Alonzo St., Poblacion, Urdaneta City" },
    { name: "JLYCC Cabanatuan", pastor: "Pastor Roberto Apan", address: "Menrium Mabini Homesite, Cabanatuan City, Nueva Ecija", fb: "https://www.facebook.com/jlycc.cabanatuan" },
    { name: "JLYCC San Jose", pastor: "Pastor Ricardo A. Fugaban Jr.", address: "1851 Maharlika Highway, Abar 1st, San Jose City", fb: "https://www.facebook.com/jly.sanjose" },
    { name: "JLYCC Castillejos", pastor: "Pastor Ferdinand T. Bermudez", address: "St. Martin Subd., Purok 1, Brgy. Del Pilar, Castillejos, Zambales", fb: "https://www.facebook.com/jlycc.castillejos" },
    { name: "JLYCC Baguio", pastor: "Pastor Dave Keneth S. Cachola", address: "#19 Aspiras-Palispis Highway, Baguio City 2600", fb: "https://www.facebook.com/JLYCC.Baguio" },
  ]},
  { name: "Visayas", count: 7, flag: "🇵🇭", churches: [
    { name: "JLYCC Iloilo", pastor: "Pastor Reymar C. Macavinta", address: "3rd Floor JEA 2 Bldg., E. Lopez St., Brgy. Our Lady of Fatima, Jaro, Iloilo City" },
    { name: "JLYCC Leyte", pastor: "Pastor Amorlina L. Elviña", address: "Nahaong, Libagon, Southern Leyte", fb: "https://www.facebook.com/jlycc.leyte" },
    { name: "JLYCC Pres Roxas Capiz", pastor: "Pastor Elizabeth S. Dinglasan", address: "Swa D, Poblacion Elizalde, Pres. Roxas, Capiz" },
    { name: "JLYCC Talisay", pastor: "Pastor Lilibeth C. Leoligao", address: "Reycar Bldg., Lower Mohon, Talisay City, Cebu" },
    { name: "JLYCC Lapu-Lapu - Cebu", pastor: "Pastor Katherine M. Jayoma", address: "3rd Floor CEP Building, Osmeña St., Gun-Ob, Lapu-Lapu City", fb: "https://www.facebook.com/Jlycclapulapu" },
    { name: "JLYCC Naga - Cebu", pastor: "Pastor Germaine Tejada", address: "Relocation Street, Brgy. Tinaan, Naga City, Cebu", fb: "https://www.facebook.com/jly.naga" },
    { name: "JLYCC Cebu", pastor: "Pastor Maria Luisa G. Martinez", address: "No. 9 V. Rama St., Brgy. Calamba, Cebu City", fb: "https://www.facebook.com/jlycccebu" },
  ]},
  { name: "Reg. 9–12", count: 5, flag: "🇵🇭", churches: [
    { name: "JLYCC CDO", pastor: "Pastor Haidee G. Ponce", address: "Enchanted Kingdom Road, Upper Canitoan, Cagayan de Oro City" },
    { name: "JLYCC Davao", pastor: "Pastor Christopher James Daway", address: "#16 Hilldrive, Bajada, Davao City", fb: "https://www.facebook.com/jlycc.davao" },
    { name: "JLYCC General Santos City", pastor: "Pastor Romeo A. Bermudez", address: "Blk 20 Lot 23 Phase IIB, Doña Soledad Subd., Labangal, Gen. Santos City", fb: "https://www.facebook.com/jlycc.gensan" },
    { name: "JLYCC Iligan", pastor: "Pastor Adonijah V. Ligtas", address: "Rosal A, Brgy. Villaverde, Iligan City", fb: "https://www.facebook.com/jlycc.iligan" },
    { name: "JLYCC Sto. Tomas", pastor: "Pastor Roselyn Rillera", address: "Fd. Rd 1, Sto. Tomas, Davao del Norte" },
  ]},
  { name: "Caraga Region", count: 10, flag: "🇵🇭", churches: [
    { name: "JLYCC Butuan City", pastor: "Pastor Ronnell C. Giray", address: "3rd Floor Gloria Bldg., R. Calo St., San Ignacio, Butuan City, Agusan del Norte", fb: "https://www.facebook.com/jlycc.butuan" },
    { name: "JLYCC Cantilan", pastor: "Pastor Cerina L. Plaza", address: "Magosilom, Cantilan, Surigao del Sur", fb: "https://www.facebook.com/jlycc.cantilan" },
    { name: "JLYCC Gamut", pastor: "Pastor Charrie D. Bataluna", address: "Purok Bombils, Gamut, Tago, Surigao del Sur 8302", fb: "https://www.facebook.com/jlycc.gamut" },
    { name: "JLYCC Gingoog City", pastor: "Pastor Estela V. Basadre", address: "Tuto St., Brgy. 17, Gingoog City", fb: "https://www.facebook.com/JLYGingoog" },
    { name: "JLYCC Lindoy", pastor: "Pastor Joey Emboy", address: "Purok African Daisy, Brgy. Lindoy, Tago, Surigao del Sur" },
    { name: "JLYCC Nasipit", pastor: "Pastor Jocelyn E. Padre", address: "602 Fuertes Street, Purok Bougainvilla, Barangay 3, Nasipit, Agusan del Norte" },
    { name: "JLYCC Panaosawon", pastor: "Pastor Frejoy Bataluna", address: "Purok 2, Brgy. Panasawon, Bayabas, Surigao del Sur" },
    { name: "JLYCC Sta. Ana", pastor: "Pastor Roselyn Sumalypo", address: "District Lahi, Sta. Ana, Agusan del Norte", fb: "https://www.facebook.com/jly.sta.ana" },
    { name: "JLYCC Tandag", pastor: "Pastor Dionesio Antivo", address: "Brgy. Victoria, Crossing, Tandag City" },
    { name: "JLYCC Kibungsod", pastor: "Pastor Juluis Verterra", address: "Prk. Paghiusa, Kibungsod, Magsaysay, Misamis Oriental" },
  ]},
  { name: "Region 2", count: 12, flag: "🇵🇭", churches: [
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
  ]},
  { name: "Pioneering", count: 8, flag: "🇵🇭", churches: [
    { name: "JLYCC Manila (Baseco)", pastor: "Pastor Junlie Lozada", address: "1-2 Blk 5 Unilever Village, Gawad Kalinga" },
    { name: "Bayumbong N.V.", pastor: "Pastor Lorelie Fabro", address: "4th Floor Mondiguing Bldg., Cabarroguis St., Brgy. Don Mariano Marcos, Bayombong, Nueva Vizcaya" },
    { name: "JLYCC Camalaniugan", pastor: "Pastor Gideon Gamal", address: "Zone 7, Brgy. Catotoran Norte, Camalaniugan, Cagayan" },
    { name: "JLYCC Quezon N.V.", pastor: "Pastor Roy Salazar", address: "Brgy. Boliwao, Quezon, Nueva Vizcaya" },
    { name: "JLYCC Roxas Capiz", pastor: "Pastor Adrian Dale Fufunan", address: "Lakandula St., Roxas City, Capiz", fb: "https://www.facebook.com/jly.roxas.capiz" },
    { name: "JLYCC Cabadbaran City", pastor: "Pastor Carlito Ducena", address: "Ojeda Ave., Purok 5, Brgy. 9, Cabadbaran City" },
    { name: "JLYCC Bugsukan", pastor: "Pastor Delvin G. Oraiz", address: "Brgy. Bugsukan, Butuan City, Agusan del Norte" },
    { name: "JLYCC New Dapitan", pastor: "Pastor Rio T. Atil", address: "Purok 1, Brgy. New Dapitan, Tampilisan, Zamboanga del Norte", fb: "https://www.facebook.com/jlycc.newdapitan" },
  ]},
];

const allRegions = [...internationalRegions, ...nationalRegions];

function gmapsUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

function RegionAccordion({ region, isOpen, onToggle }: { region: Region; isOpen: boolean; onToggle: () => void; }) {
  return (
    <div className={`rounded-xl border overflow-hidden transition-all duration-200 ${isOpen ? "border-teal-500 bg-teal-600" : "border-teal-400/60 bg-teal-500"}`}>
      <button onClick={onToggle} className="w-full flex items-center justify-between px-4 py-3 text-left" aria-expanded={isOpen}>
        <span className="font-semibold text-white text-sm flex items-center gap-2">
          <MapPin size={13} className="shrink-0" />{region.name}
          <span className="bg-white/20 text-white text-xs font-black px-1.5 py-0.5 rounded-full">{region.count}</span>
        </span>
        <ChevronDown size={15} className={`text-white/80 transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden bg-white">
            <div className="max-h-72 overflow-y-auto">
              {region.churches.map((church, i) => (
                <div key={church.name} className={`px-4 py-3 ${i !== region.churches.length - 1 ? "border-b border-gray-100" : ""}`}>
                  <div className="flex items-center gap-2 font-semibold text-gray-900 text-sm">
                    <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0" />
                    {church.flag && <span>{church.flag}</span>}{church.name}
                  </div>
                  {church.pastor && <p className="text-teal-500 text-xs mt-0.5 pl-4 italic">{church.pastor}</p>}
                  {church.address && <a href={gmapsUrl(church.address)} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 text-xs mt-0.5 pl-4 leading-snug block underline underline-offset-1">{church.address}</a>}
                  {church.fb && <a href={church.fb} target="_blank" rel="noopener noreferrer" className="text-teal-500 hover:text-teal-700 text-xs font-semibold pl-4 mt-1 block">FB Page</a>}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ChurchDirectory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });
  const [activeIntl, setActiveIntl] = useState<string | null>(null);
  const [activeNat, setActiveNat] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const q = search.toLowerCase().trim();
  const searchResults = q ? allRegions.flatMap(r =>
    r.churches.filter(c =>
      c.name.toLowerCase().includes(q) || c.pastor?.toLowerCase().includes(q) || c.address?.toLowerCase().includes(q)
    ).map(c => ({ church: c, regionName: r.name }))
  ) : [];

  return (
    <section id="directories" className="py-24 bg-gray-50 relative overflow-hidden" aria-labelledby="directory-heading">
      <div className="container-section" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-12">
          <span className="text-xs font-black tracking-widest uppercase text-teal-500 mb-2 block">OUR LOCATIONS</span>
          <h2 id="directory-heading" className="font-heading text-4xl md:text-5xl font-black text-gray-900 mt-2">CHURCH DIRECTORY</h2>
          <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">Join a JLYCC family near you. We are a growing community with satellite churches across the Philippines and around the world.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="max-w-2xl mx-auto mb-10">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by city, region, or pastor name..." className="w-full bg-white border border-gray-200 rounded-2xl pl-12 pr-10 py-4 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:border-teal-500 transition-colors shadow-sm" aria-label="Search church locations" />
              {search && <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><X size={16} /></button>}
            </div>
            <a href="https://www.google.com/maps/search/JLYCC+church+near+me" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-bold text-sm px-5 py-4 rounded-2xl transition-colors whitespace-nowrap shadow-sm">
              <Navigation size={16} />Near Me
            </a>
          </div>
          {search && <p className="text-sm text-gray-500 mt-3 pl-1">Found <span className="font-bold text-teal-600">{searchResults.length}</span> location{searchResults.length !== 1 ? "s" : ""}</p>}
        </motion.div>
        {search && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto mb-10">
            {searchResults.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.map(({ church, regionName }) => (
                  <div key={`${regionName}-${church.name}`} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-teal-500 mt-1 shrink-0" /><span className="font-bold text-gray-900 text-sm">{church.flag && `${church.flag} `}{church.name}</span></div>
                      <span className="text-xs font-semibold text-teal-600 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">{regionName}</span>
                    </div>
                    {church.pastor && <p className="text-teal-500 text-xs font-medium mb-1 pl-4 italic">{church.pastor}</p>}
                    {church.address && <a href={gmapsUrl(church.address)} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 text-xs pl-4 leading-snug block mb-2 underline underline-offset-2">{church.address}</a>}
                    {church.fb && <a href={church.fb} target="_blank" rel="noopener noreferrer" className="text-teal-500 hover:text-teal-700 text-xs font-semibold pl-4">FB Page</a>}
                  </div>
                ))}
              </div>
            ) : <p className="text-center text-gray-400 py-8">No churches found for "{search}"</p>}
          </motion.div>
        )}
        {!search && (
          <>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }} className="mb-10">
              <div className="flex items-center gap-3 mb-5"><Globe size={18} className="text-teal-500" /><h3 className="font-heading font-black text-gray-800 text-lg">International Churches</h3></div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {internationalRegions.map((region) => <RegionAccordion key={region.name} region={region} isOpen={activeIntl === region.name} onToggle={() => setActiveIntl(activeIntl === region.name ? null : region.name)} />)}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.5 }}>
              <div className="flex items-center gap-3 mb-5"><Flag size={18} className="text-teal-500" /><h3 className="font-heading font-black text-gray-800 text-lg">National Churches 🇵🇭</h3></div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {nationalRegions.map((region) => <RegionAccordion key={region.name} region={region} isOpen={activeNat === region.name} onToggle={() => setActiveNat(activeNat === region.name ? null : region.name)} />)}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.8 }} className="text-center mt-10">
              <a href="/find-a-church" className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-bold px-8 py-4 rounded-2xl transition-colors"><MapPin size={16} />View Full Church Directory</a>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
