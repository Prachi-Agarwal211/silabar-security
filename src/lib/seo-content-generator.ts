import { CityLocation, StateLocation } from '@/data/locations'

// Simple deterministic string hash
function stringToHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Select item deterministically based on seed and index
function select<T>(seed: number, index: number, options: T[]): T {
  const combinedSeed = seed + (index * 1337);
  return options[combinedSeed % options.length]!;
}

const PARAGRAPH_1_TEMPLATES = [
  "Silbar Security provides industry-leading security guard services across {city}, {state}. From bustling commercial hubs to critical industrial zones, our professionally trained personnel deliver unmatched protection.",
  "Operating across {city}, Silbar Security is {state}'s most trusted provider of manned guarding and facility management. We deploy ISO-certified security solutions customized to local requirements.",
  "Businesses in {city} trust Silbar Security for comprehensive protection. Our specialized security guards, equipped with modern surveillance technology, ensure complete safety across {state}.",
  "As a premier security agency in {city}, Silbar Security offers robust guarding solutions. We combine rigorously trained personnel with electronic surveillance to protect assets throughout {state}."
];

const PARAGRAPH_2_TEMPLATES = [
  "With a population of {population}, the dynamic landscape of {city} requires specialized security protocols. Our dedicated teams manage risks efficiently, ensuring 24/7 operational continuity.",
  "{city}'s growing infrastructure and population of {population} demand advanced security management. Silbar Security deploys highly trained guards who are well-versed in handling high-traffic and sensitive environments.",
  "Managing security in a Tier {tier} city like {city} involves unique challenges. With {population} residents, our tailored security deployments guarantee safety for manufacturing plants, hospitals, and corporate parks.",
  "Serving the {population} residents of {city}, our security teams are trained for rapid response and strict access control, making us the top choice for Tier {tier} security operations."
];

const PARAGRAPH_3_TEMPLATES = [
  "Every security guard deployed in {city} undergoes extensive background checks and rigorous training. We ensure 100% compliance with PSARA guidelines and all statutory labor laws.",
  "Our commitment to {city} includes a 24-hour guard replacement guarantee, dedicated account managers, and continuous night patrols. Safety is not just a promise; it's our standard.",
  "We maintain a strict quality control process in {city}, featuring monthly MIS reporting, surprise night checks, and continuous training programs for all deployed personnel.",
  "Silbar Security’s operations in {city} are backed by a rapid response protocol and strict adherence to ESI, PF, and PSARA compliances, ensuring risk-free security management."
];

const STATE_PARAGRAPH_1 = [
  "Silbar Security is the premier provider of security services across {state}. Covering all {districts} districts, we deliver professional guarding solutions tailored to regional compliance and industrial requirements.",
  "From the capital in {capital} to every major industrial hub, Silbar Security secures {state}. With operations spanning {districts} districts, we are the state's most reliable security partner.",
  "Protecting {state}'s most critical infrastructure, Silbar Security offers ISO 9001:2015 certified guarding services. We operate seamlessly across all {districts} districts, ensuring uniform quality and compliance.",
];

const STATE_PARAGRAPH_2 = [
  "With a population of {population}, {state} presents unique security challenges. Our localized approach ensures that whether in {capital} or remote manufacturing zones, our personnel provide vigilant protection.",
  "{state}'s rapid economic growth and {population} residents demand robust security architectures. We deploy fully compliant, PSARA-licensed guards who understand the local language and operational nuances.",
  "Serving {population} people across {state}, our security network is vast yet agile. We integrate manned guarding with advanced CCTV surveillance to protect corporate, industrial, and residential assets."
];

export function generateCityContent(city: CityLocation) {
  const seed = stringToHash(city.slug);
  
  const p1 = select(seed, 1, PARAGRAPH_1_TEMPLATES)
    .replace(/{city}/g, city.name)
    .replace(/{state}/g, city.state);
    
  const p2 = select(seed, 2, PARAGRAPH_2_TEMPLATES)
    .replace(/{city}/g, city.name)
    .replace(/{population}/g, city.population)
    .replace(/{tier}/g, city.tier.toString());
    
  const p3 = select(seed, 3, PARAGRAPH_3_TEMPLATES)
    .replace(/{city}/g, city.name);

  return [p1, p2, p3];
}

export function generateStateContent(state: StateLocation) {
  const seed = stringToHash(state.slug);
  
  const p1 = select(seed, 1, STATE_PARAGRAPH_1)
    .replace(/{state}/g, state.name)
    .replace(/{capital}/g, state.capital)
    .replace(/{districts}/g, state.districts.toString());
    
  const p2 = select(seed, 2, STATE_PARAGRAPH_2)
    .replace(/{state}/g, state.name)
    .replace(/{population}/g, state.population)
    .replace(/{capital}/g, state.capital);

  return [p1, p2];
}
