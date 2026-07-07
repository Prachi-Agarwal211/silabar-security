export interface StateLocation {
  slug: string          // used in URL: /security-services/rajasthan
  name: string          // display name
  capital: string
  majorCities: string[]
  districts: number
  population: string    // for schema
}

export interface CityLocation {
  slug: string          // used in URL: /security-services/city/jaipur
  name: string
  state: string
  stateSlug: string
  population: string
  tier: 1 | 2 | 3
}

export const STATES: StateLocation[] = [
  { slug: 'rajasthan', name: 'Rajasthan', capital: 'Jaipur', majorCities: ['Jaipur', 'Jodhpur', 'Kota', 'Ajmer', 'Bikaner', 'Udaipur'], districts: 50, population: '81 million' },
  { slug: 'delhi', name: 'Delhi', capital: 'New Delhi', majorCities: ['New Delhi', 'Noida', 'Gurugram', 'Faridabad', 'Ghaziabad'], districts: 11, population: '32 million' },
  { slug: 'gujarat', name: 'Gujarat', capital: 'Gandhinagar', majorCities: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar'], districts: 33, population: '70 million' },
  { slug: 'maharashtra', name: 'Maharashtra', capital: 'Mumbai', majorCities: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Thane'], districts: 36, population: '124 million' },
  { slug: 'uttar-pradesh', name: 'Uttar Pradesh', capital: 'Lucknow', majorCities: ['Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Noida'], districts: 75, population: '240 million' },
  { slug: 'haryana', name: 'Haryana', capital: 'Chandigarh', majorCities: ['Gurugram', 'Faridabad', 'Hisar', 'Rohtak', 'Ambala'], districts: 22, population: '29 million' },
  { slug: 'karnataka', name: 'Karnataka', capital: 'Bengaluru', majorCities: ['Bengaluru', 'Mysuru', 'Hubli', 'Mangaluru', 'Belagavi'], districts: 31, population: '67 million' },
  { slug: 'tamil-nadu', name: 'Tamil Nadu', capital: 'Chennai', majorCities: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem'], districts: 38, population: '77 million' },
  { slug: 'telangana', name: 'Telangana', capital: 'Hyderabad', majorCities: ['Hyderabad', 'Warangal', 'Karimnagar', 'Nizamabad'], districts: 33, population: '39 million' },
  { slug: 'andhra-pradesh', name: 'Andhra Pradesh', capital: 'Amaravati', majorCities: ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Tirupati'], districts: 13, population: '52 million' },
  { slug: 'madhya-pradesh', name: 'Madhya Pradesh', capital: 'Bhopal', majorCities: ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain'], districts: 52, population: '85 million' },
  { slug: 'west-bengal', name: 'West Bengal', capital: 'Kolkata', majorCities: ['Kolkata', 'Howrah', 'Durgapur', 'Siliguri', 'Asansol'], districts: 23, population: '99 million' },
  { slug: 'punjab', name: 'Punjab', capital: 'Chandigarh', majorCities: ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Chandigarh'], districts: 23, population: '30 million' },
  { slug: 'bihar', name: 'Bihar', capital: 'Patna', majorCities: ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Purnia'], districts: 38, population: '125 million' },
  { slug: 'jharkhand', name: 'Jharkhand', capital: 'Ranchi', majorCities: ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro'], districts: 24, population: '38 million' },
  { slug: 'odisha', name: 'Odisha', capital: 'Bhubaneswar', majorCities: ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur'], districts: 30, population: '46 million' },
  { slug: 'chhattisgarh', name: 'Chhattisgarh', capital: 'Raipur', majorCities: ['Raipur', 'Bhilai', 'Bilaspur', 'Durg', 'Korba'], districts: 33, population: '32 million' },
  { slug: 'uttarakhand', name: 'Uttarakhand', capital: 'Dehradun', majorCities: ['Dehradun', 'Haridwar', 'Rishikesh', 'Nainital', 'Roorkee'], districts: 13, population: '11 million' },
  { slug: 'himachal-pradesh', name: 'Himachal Pradesh', capital: 'Shimla', majorCities: ['Shimla', 'Dharamshala', 'Manali', 'Solan'], districts: 12, population: '7 million' },
  { slug: 'kerala', name: 'Kerala', capital: 'Thiruvananthapuram', majorCities: ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur'], districts: 14, population: '35 million' },
  { slug: 'goa', name: 'Goa', capital: 'Panaji', majorCities: ['Panaji', 'Margao', 'Vasco', 'Mapusa'], districts: 2, population: '1.5 million' },
  { slug: 'assam', name: 'Assam', capital: 'Dispur', majorCities: ['Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat'], districts: 35, population: '35 million' },
]

// Top cities for initial launch — expand to 200+ by adding to this array
export const CITIES: CityLocation[] = [
  { slug: 'jaipur', name: 'Jaipur', state: 'Rajasthan', stateSlug: 'rajasthan', population: '4 million', tier: 1 },
  { slug: 'delhi', name: 'Delhi', state: 'Delhi', stateSlug: 'delhi', population: '32 million', tier: 1 },
  { slug: 'ahmedabad', name: 'Ahmedabad', state: 'Gujarat', stateSlug: 'gujarat', population: '8 million', tier: 1 },
  { slug: 'mumbai', name: 'Mumbai', state: 'Maharashtra', stateSlug: 'maharashtra', population: '21 million', tier: 1 },
  { slug: 'pune', name: 'Pune', state: 'Maharashtra', stateSlug: 'maharashtra', population: '7 million', tier: 1 },
  { slug: 'bengaluru', name: 'Bengaluru', state: 'Karnataka', stateSlug: 'karnataka', population: '13 million', tier: 1 },
  { slug: 'hyderabad', name: 'Hyderabad', state: 'Telangana', stateSlug: 'telangana', population: '10 million', tier: 1 },
  { slug: 'chennai', name: 'Chennai', state: 'Tamil Nadu', stateSlug: 'tamil-nadu', population: '11 million', tier: 1 },
  { slug: 'kolkata', name: 'Kolkata', state: 'West Bengal', stateSlug: 'west-bengal', population: '15 million', tier: 1 },
  { slug: 'surat', name: 'Surat', state: 'Gujarat', stateSlug: 'gujarat', population: '7 million', tier: 1 },
  { slug: 'jodhpur', name: 'Jodhpur', state: 'Rajasthan', stateSlug: 'rajasthan', population: '1.5 million', tier: 2 },
  { slug: 'noida', name: 'Noida', state: 'Uttar Pradesh', stateSlug: 'uttar-pradesh', population: '700k', tier: 1 },
  { slug: 'gurugram', name: 'Gurugram', state: 'Haryana', stateSlug: 'haryana', population: '900k', tier: 1 },
  { slug: 'indore', name: 'Indore', state: 'Madhya Pradesh', stateSlug: 'madhya-pradesh', population: '3 million', tier: 2 },
  { slug: 'lucknow', name: 'Lucknow', state: 'Uttar Pradesh', stateSlug: 'uttar-pradesh', population: '3.5 million', tier: 1 },
  { slug: 'vadodara', name: 'Vadodara', state: 'Gujarat', stateSlug: 'gujarat', population: '2 million', tier: 2 },
  { slug: 'udaipur', name: 'Udaipur', state: 'Rajasthan', stateSlug: 'rajasthan', population: '500k', tier: 3 },
  { slug: 'kota', name: 'Kota', state: 'Rajasthan', stateSlug: 'rajasthan', population: '1 million', tier: 2 },
]
