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
  { slug: 'haryana', name: 'Haryana', capital: 'Chandigarh', majorCities: ['Gurugram', 'Faridabad', 'Hisar', 'Rohtak', 'Ambala', 'Panipat', 'Karnal'], districts: 22, population: '29 million' },
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
  // Missing Northeast States
  { slug: 'sikkim', name: 'Sikkim', capital: 'Gangtok', majorCities: ['Gangtok', 'Namchi', 'Geyzing'], districts: 6, population: '0.7 million' },
  { slug: 'nagaland', name: 'Nagaland', capital: 'Kohima', majorCities: ['Kohima', 'Dimapur', 'Mokokchung'], districts: 16, population: '2.3 million' },
  { slug: 'manipur', name: 'Manipur', capital: 'Imphal', majorCities: ['Imphal', 'Thoubal', 'Bishnupur'], districts: 16, population: '3.1 million' },
  { slug: 'mizoram', name: 'Mizoram', capital: 'Aizawl', majorCities: ['Aizawl', 'Lunglei', 'Sairang'], districts: 8, population: '1.2 million' },
  { slug: 'meghalaya', name: 'Meghalaya', capital: 'Shillong', majorCities: ['Shillong', 'Tura', 'Jowai'], districts: 12, population: '3.8 million' },
  { slug: 'tripura', name: 'Tripura', capital: 'Agartala', majorCities: ['Agartala', 'Udaipur', 'Dharmanagar'], districts: 8, population: '4.2 million' },
  // Union Territories
  { slug: 'jammu-and-kashmir', name: 'Jammu & Kashmir', capital: 'Srinagar', majorCities: ['Srinagar', 'Jammu', 'Anantnag', 'Baramulla'], districts: 20, population: '14 million' },
  { slug: 'ladakh', name: 'Ladakh', capital: 'Leh', majorCities: ['Leh', 'Kargil'], districts: 2, population: '0.3 million' },
  { slug: 'chandigarh', name: 'Chandigarh', capital: 'Chandigarh', majorCities: ['Chandigarh'], districts: 1, population: '1.2 million' },
  { slug: 'puducherry', name: 'Puducherry', capital: 'Puducherry', majorCities: ['Puducherry', 'Karaikal', 'Yanam'], districts: 4, population: '1.4 million' },
  { slug: 'andaman-and-nicobar', name: 'Andaman & Nicobar Islands', capital: 'Port Blair', majorCities: ['Port Blair'], districts: 3, population: '0.4 million' },
  { slug: 'dadra-and-nagar-haveli', name: 'Dadra & Nagar Haveli', capital: 'Silvassa', majorCities: ['Silvassa', 'Daman'], districts: 2, population: '0.6 million' },
  { slug: 'lakshadweep', name: 'Lakshadweep', capital: 'Kavaratti', majorCities: ['Kavaratti', 'Agatti'], districts: 1, population: '0.07 million' },
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
  // Rajasthan (more)
  { slug: 'ajmer', name: 'Ajmer', state: 'Rajasthan', stateSlug: 'rajasthan', population: '600k', tier: 2 },
  { slug: 'bikaner', name: 'Bikaner', state: 'Rajasthan', stateSlug: 'rajasthan', population: '700k', tier: 2 },
  { slug: 'bhilwara', name: 'Bhilwara', state: 'Rajasthan', stateSlug: 'rajasthan', population: '400k', tier: 3 },
  { slug: 'alwar', name: 'Alwar', state: 'Rajasthan', stateSlug: 'rajasthan', population: '350k', tier: 3 },
  { slug: 'sikar', name: 'Sikar', state: 'Rajasthan', stateSlug: 'rajasthan', population: '250k', tier: 3 },
  { slug: 'tonk', name: 'Tonk', state: 'Rajasthan', stateSlug: 'rajasthan', population: '200k', tier: 3 },
  { slug: 'kishangarh', name: 'Kishangarh', state: 'Rajasthan', stateSlug: 'rajasthan', population: '200k', tier: 3 },
  { slug: 'jhunjhunu', name: 'Jhunjhunu', state: 'Rajasthan', stateSlug: 'rajasthan', population: '150k', tier: 3 },
  { slug: 'pali', name: 'Pali', state: 'Rajasthan', stateSlug: 'rajasthan', population: '250k', tier: 3 },
  { slug: 'ganganagar', name: 'Ganganagar', state: 'Rajasthan', stateSlug: 'rajasthan', population: '250k', tier: 3 },
  { slug: 'bharatpur', name: 'Bharatpur', state: 'Rajasthan', stateSlug: 'rajasthan', population: '300k', tier: 3 },
  // Maharashtra (more)
  { slug: 'nagpur', name: 'Nagpur', state: 'Maharashtra', stateSlug: 'maharashtra', population: '2.5 million', tier: 2 },
  { slug: 'nashik', name: 'Nashik', state: 'Maharashtra', stateSlug: 'maharashtra', population: '1.5 million', tier: 2 },
  { slug: 'thane', name: 'Thane', state: 'Maharashtra', stateSlug: 'maharashtra', population: '1.8 million', tier: 2 },
  { slug: 'aurangabad', name: 'Aurangabad', state: 'Maharashtra', stateSlug: 'maharashtra', population: '1.2 million', tier: 2 },
  { slug: 'solapur', name: 'Solapur', state: 'Maharashtra', stateSlug: 'maharashtra', population: '900k', tier: 3 },
  { slug: 'kolhapur', name: 'Kolhapur', state: 'Maharashtra', stateSlug: 'maharashtra', population: '600k', tier: 3 },
  { slug: 'navi-mumbai', name: 'Navi Mumbai', state: 'Maharashtra', stateSlug: 'maharashtra', population: '1.1 million', tier: 2 },
  { slug: 'amravati', name: 'Amravati', state: 'Maharashtra', stateSlug: 'maharashtra', population: '650k', tier: 3 },
  // Gujarat (more)
  { slug: 'rajkot', name: 'Rajkot', state: 'Gujarat', stateSlug: 'gujarat', population: '1.5 million', tier: 2 },
  { slug: 'bhavnagar', name: 'Bhavnagar', state: 'Gujarat', stateSlug: 'gujarat', population: '600k', tier: 3 },
  { slug: 'jamnagar', name: 'Jamnagar', state: 'Gujarat', stateSlug: 'gujarat', population: '500k', tier: 3 },
  { slug: 'anand', name: 'Anand', state: 'Gujarat', stateSlug: 'gujarat', population: '300k', tier: 3 },
  { slug: 'gandhinagar', name: 'Gandhinagar', state: 'Gujarat', stateSlug: 'gujarat', population: '300k', tier: 3 },
  { slug: 'mehsana', name: 'Mehsana', state: 'Gujarat', stateSlug: 'gujarat', population: '200k', tier: 3 },
  // Uttar Pradesh (more)
  { slug: 'kanpur', name: 'Kanpur', state: 'Uttar Pradesh', stateSlug: 'uttar-pradesh', population: '3 million', tier: 2 },
  { slug: 'agra', name: 'Agra', state: 'Uttar Pradesh', stateSlug: 'uttar-pradesh', population: '1.7 million', tier: 2 },
  { slug: 'varanasi', name: 'Varanasi', state: 'Uttar Pradesh', stateSlug: 'uttar-pradesh', population: '1.5 million', tier: 2 },
  { slug: 'ghaziabad', name: 'Ghaziabad', state: 'Uttar Pradesh', stateSlug: 'uttar-pradesh', population: '1.6 million', tier: 2 },
  { slug: 'meerut', name: 'Meerut', state: 'Uttar Pradesh', stateSlug: 'uttar-pradesh', population: '1.3 million', tier: 2 },
  { slug: 'allahabad', name: 'Prayagraj', state: 'Uttar Pradesh', stateSlug: 'uttar-pradesh', population: '1.2 million', tier: 2 },
  { slug: 'bareilly', name: 'Bareilly', state: 'Uttar Pradesh', stateSlug: 'uttar-pradesh', population: '900k', tier: 3 },
  { slug: 'gorakhpur', name: 'Gorakhpur', state: 'Uttar Pradesh', stateSlug: 'uttar-pradesh', population: '700k', tier: 3 },
  { slug: 'moradabad', name: 'Moradabad', state: 'Uttar Pradesh', stateSlug: 'uttar-pradesh', population: '800k', tier: 3 },
  { slug: 'saharanpur', name: 'Saharanpur', state: 'Uttar Pradesh', stateSlug: 'uttar-pradesh', population: '600k', tier: 3 },
  { slug: 'aligarh', name: 'Aligarh', state: 'Uttar Pradesh', stateSlug: 'uttar-pradesh', population: '900k', tier: 3 },
  { slug: 'mathura', name: 'Mathura', state: 'Uttar Pradesh', stateSlug: 'uttar-pradesh', population: '500k', tier: 3 },
  // Haryana (more)
  { slug: 'faridabad', name: 'Faridabad', state: 'Haryana', stateSlug: 'haryana', population: '1.4 million', tier: 2 },
  { slug: 'hisar', name: 'Hisar', state: 'Haryana', stateSlug: 'haryana', population: '350k', tier: 3 },
  { slug: 'rohtak', name: 'Rohtak', state: 'Haryana', stateSlug: 'haryana', population: '400k', tier: 3 },
  { slug: 'panipat', name: 'Panipat', state: 'Haryana', stateSlug: 'haryana', population: '450k', tier: 3 },
  { slug: 'ambala', name: 'Ambala', state: 'Haryana', stateSlug: 'haryana', population: '500k', tier: 3 },
  { slug: 'karnal', name: 'Karnal', state: 'Haryana', stateSlug: 'haryana', population: '350k', tier: 3 },
  { slug: 'sonipat', name: 'Sonipat', state: 'Haryana', stateSlug: 'haryana', population: '350k', tier: 3 },
  { slug: 'panchkula', name: 'Panchkula', state: 'Haryana', stateSlug: 'haryana', population: '250k', tier: 3 },
  // Karnataka (more)
  { slug: 'mysuru', name: 'Mysuru', state: 'Karnataka', stateSlug: 'karnataka', population: '1 million', tier: 2 },
  { slug: 'hubli', name: 'Hubli', state: 'Karnataka', stateSlug: 'karnataka', population: '900k', tier: 3 },
  { slug: 'mangaluru', name: 'Mangaluru', state: 'Karnataka', stateSlug: 'karnataka', population: '600k', tier: 3 },
  { slug: 'belagavi', name: 'Belagavi', state: 'Karnataka', stateSlug: 'karnataka', population: '500k', tier: 3 },
  { slug: 'davanagere', name: 'Davanagere', state: 'Karnataka', stateSlug: 'karnataka', population: '400k', tier: 3 },
  { slug: 'gulbarga', name: 'Kalaburagi', state: 'Karnataka', stateSlug: 'karnataka', population: '500k', tier: 3 },
  { slug: 'shivamogga', name: 'Shivamogga', state: 'Karnataka', stateSlug: 'karnataka', population: '350k', tier: 3 },
  // Tamil Nadu (more)
  { slug: 'coimbatore', name: 'Coimbatore', state: 'Tamil Nadu', stateSlug: 'tamil-nadu', population: '1.6 million', tier: 2 },
  { slug: 'madurai', name: 'Madurai', state: 'Tamil Nadu', stateSlug: 'tamil-nadu', population: '1.5 million', tier: 2 },
  { slug: 'tiruchirappalli', name: 'Tiruchirappalli', state: 'Tamil Nadu', stateSlug: 'tamil-nadu', population: '1 million', tier: 2 },
  { slug: 'salem', name: 'Salem', state: 'Tamil Nadu', stateSlug: 'tamil-nadu', population: '900k', tier: 3 },
  { slug: 'tirunelveli', name: 'Tirunelveli', state: 'Tamil Nadu', stateSlug: 'tamil-nadu', population: '500k', tier: 3 },
  { slug: 'tiruppur', name: 'Tiruppur', state: 'Tamil Nadu', stateSlug: 'tamil-nadu', population: '900k', tier: 3 },
  { slug: 'vellore', name: 'Vellore', state: 'Tamil Nadu', stateSlug: 'tamil-nadu', population: '500k', tier: 3 },
  { slug: 'erode', name: 'Erode', state: 'Tamil Nadu', stateSlug: 'tamil-nadu', population: '500k', tier: 3 },
  // Telangana (more)
  { slug: 'warangal', name: 'Warangal', state: 'Telangana', stateSlug: 'telangana', population: '800k', tier: 3 },
  { slug: 'nizamabad', name: 'Nizamabad', state: 'Telangana', stateSlug: 'telangana', population: '350k', tier: 3 },
  { slug: 'karimnagar', name: 'Karimnagar', state: 'Telangana', stateSlug: 'telangana', population: '300k', tier: 3 },
  { slug: 'ramagundam', name: 'Ramagundam', state: 'Telangana', stateSlug: 'telangana', population: '250k', tier: 3 },
  // Andhra Pradesh (more)
  { slug: 'visakhapatnam', name: 'Visakhapatnam', state: 'Andhra Pradesh', stateSlug: 'andhra-pradesh', population: '2 million', tier: 2 },
  { slug: 'vijayawada', name: 'Vijayawada', state: 'Andhra Pradesh', stateSlug: 'andhra-pradesh', population: '1 million', tier: 2 },
  { slug: 'guntur', name: 'Guntur', state: 'Andhra Pradesh', stateSlug: 'andhra-pradesh', population: '700k', tier: 3 },
  { slug: 'nellore', name: 'Nellore', state: 'Andhra Pradesh', stateSlug: 'andhra-pradesh', population: '600k', tier: 3 },
  { slug: 'tirupati', name: 'Tirupati', state: 'Andhra Pradesh', stateSlug: 'andhra-pradesh', population: '500k', tier: 3 },
  { slug: 'kurnool', name: 'Kurnool', state: 'Andhra Pradesh', stateSlug: 'andhra-pradesh', population: '500k', tier: 3 },
  { slug: 'kakinada', name: 'Kakinada', state: 'Andhra Pradesh', stateSlug: 'andhra-pradesh', population: '400k', tier: 3 },
  // Madhya Pradesh (more)
  { slug: 'bhopal', name: 'Bhopal', state: 'Madhya Pradesh', stateSlug: 'madhya-pradesh', population: '2.5 million', tier: 2 },
  { slug: 'gwalior', name: 'Gwalior', state: 'Madhya Pradesh', stateSlug: 'madhya-pradesh', population: '1.1 million', tier: 2 },
  { slug: 'jabalpur', name: 'Jabalpur', state: 'Madhya Pradesh', stateSlug: 'madhya-pradesh', population: '1.2 million', tier: 2 },
  { slug: 'ujjain', name: 'Ujjain', state: 'Madhya Pradesh', stateSlug: 'madhya-pradesh', population: '600k', tier: 3 },
  { slug: 'sagar', name: 'Sagar', state: 'Madhya Pradesh', stateSlug: 'madhya-pradesh', population: '400k', tier: 3 },
  { slug: 'dewas', name: 'Dewas', state: 'Madhya Pradesh', stateSlug: 'madhya-pradesh', population: '300k', tier: 3 },
  { slug: 'ratlam', name: 'Ratlam', state: 'Madhya Pradesh', stateSlug: 'madhya-pradesh', population: '300k', tier: 3 },
  // West Bengal (more)
  { slug: 'howrah', name: 'Howrah', state: 'West Bengal', stateSlug: 'west-bengal', population: '1 million', tier: 2 },
  { slug: 'durgapur', name: 'Durgapur', state: 'West Bengal', stateSlug: 'west-bengal', population: '600k', tier: 3 },
  { slug: 'siliguri', name: 'Siliguri', state: 'West Bengal', stateSlug: 'west-bengal', population: '700k', tier: 3 },
  { slug: 'asansol', name: 'Asansol', state: 'West Bengal', stateSlug: 'west-bengal', population: '600k', tier: 3 },
  { slug: 'barasat', name: 'Barasat', state: 'West Bengal', stateSlug: 'west-bengal', population: '500k', tier: 3 },
  // Punjab (more)
  { slug: 'chandigarh', name: 'Chandigarh', state: 'Punjab', stateSlug: 'punjab', population: '1.2 million', tier: 2 },
  { slug: 'ludhiana', name: 'Ludhiana', state: 'Punjab', stateSlug: 'punjab', population: '1.6 million', tier: 2 },
  { slug: 'amritsar', name: 'Amritsar', state: 'Punjab', stateSlug: 'punjab', population: '1.2 million', tier: 2 },
  { slug: 'jalandhar', name: 'Jalandhar', state: 'Punjab', stateSlug: 'punjab', population: '900k', tier: 3 },
  { slug: 'patiala', name: 'Patiala', state: 'Punjab', stateSlug: 'punjab', population: '500k', tier: 3 },
  { slug: 'bathinda', name: 'Bathinda', state: 'Punjab', stateSlug: 'punjab', population: '300k', tier: 3 },
  { slug: 'mohali', name: 'Mohali', state: 'Punjab', stateSlug: 'punjab', population: '200k', tier: 3 },
  // Bihar (more)
  { slug: 'patna', name: 'Patna', state: 'Bihar', stateSlug: 'bihar', population: '2.5 million', tier: 2 },
  { slug: 'gaya', name: 'Gaya', state: 'Bihar', stateSlug: 'bihar', population: '500k', tier: 3 },
  { slug: 'bhagalpur', name: 'Bhagalpur', state: 'Bihar', stateSlug: 'bihar', population: '500k', tier: 3 },
  { slug: 'muzaffarpur', name: 'Muzaffarpur', state: 'Bihar', stateSlug: 'bihar', population: '400k', tier: 3 },
  { slug: 'purnia', name: 'Purnia', state: 'Bihar', stateSlug: 'bihar', population: '300k', tier: 3 },
  { slug: 'darbhanga', name: 'Darbhanga', state: 'Bihar', stateSlug: 'bihar', population: '350k', tier: 3 },
  // Jharkhand (more)
  { slug: 'ranchi', name: 'Ranchi', state: 'Jharkhand', stateSlug: 'jharkhand', population: '1.1 million', tier: 2 },
  { slug: 'jamshedpur', name: 'Jamshedpur', state: 'Jharkhand', stateSlug: 'jharkhand', population: '1.5 million', tier: 2 },
  { slug: 'dhanbad', name: 'Dhanbad', state: 'Jharkhand', stateSlug: 'jharkhand', population: '1.2 million', tier: 2 },
  { slug: 'bokaro', name: 'Bokaro', state: 'Jharkhand', stateSlug: 'jharkhand', population: '600k', tier: 3 },
  { slug: 'deoghar', name: 'Deoghar', state: 'Jharkhand', stateSlug: 'jharkhand', population: '200k', tier: 3 },
  // Odisha (more)
  { slug: 'bhubaneswar', name: 'Bhubaneswar', state: 'Odisha', stateSlug: 'odisha', population: '1.2 million', tier: 2 },
  { slug: 'cuttack', name: 'Cuttack', state: 'Odisha', stateSlug: 'odisha', population: '700k', tier: 3 },
  { slug: 'rourkela', name: 'Rourkela', state: 'Odisha', stateSlug: 'odisha', population: '600k', tier: 3 },
  { slug: 'berhampur', name: 'Berhampur', state: 'Odisha', stateSlug: 'odisha', population: '400k', tier: 3 },
  { slug: 'sambalpur', name: 'Sambalpur', state: 'Odisha', stateSlug: 'odisha', population: '300k', tier: 3 },
  // Chhattisgarh (more)
  { slug: 'raipur', name: 'Raipur', state: 'Chhattisgarh', stateSlug: 'chhattisgarh', population: '1.2 million', tier: 2 },
  { slug: 'bhilai', name: 'Bhilai', state: 'Chhattisgarh', stateSlug: 'chhattisgarh', population: '1 million', tier: 2 },
  { slug: 'bilaspur', name: 'Bilaspur', state: 'Chhattisgarh', stateSlug: 'chhattisgarh', population: '500k', tier: 3 },
  { slug: 'korba', name: 'Korba', state: 'Chhattisgarh', stateSlug: 'chhattisgarh', population: '400k', tier: 3 },
  { slug: 'durg', name: 'Durg', state: 'Chhattisgarh', stateSlug: 'chhattisgarh', population: '300k', tier: 3 },
  // Uttarakhand (more)
  { slug: 'dehradun', name: 'Dehradun', state: 'Uttarakhand', stateSlug: 'uttarakhand', population: '800k', tier: 2 },
  { slug: 'haridwar', name: 'Haridwar', state: 'Uttarakhand', stateSlug: 'uttarakhand', population: '300k', tier: 3 },
  { slug: 'rishikesh', name: 'Rishikesh', state: 'Uttarakhand', stateSlug: 'uttarakhand', population: '150k', tier: 3 },
  { slug: 'nainital', name: 'Nainital', state: 'Uttarakhand', stateSlug: 'uttarakhand', population: '100k', tier: 3 },
  { slug: 'roorkee', name: 'Roorkee', state: 'Uttarakhand', stateSlug: 'uttarakhand', population: '200k', tier: 3 },
  { slug: 'haldwani', name: 'Haldwani', state: 'Uttarakhand', stateSlug: 'uttarakhand', population: '250k', tier: 3 },
  // Himachal Pradesh (more)
  { slug: 'shimla', name: 'Shimla', state: 'Himachal Pradesh', stateSlug: 'himachal-pradesh', population: '200k', tier: 3 },
  { slug: 'dharamshala', name: 'Dharamshala', state: 'Himachal Pradesh', stateSlug: 'himachal-pradesh', population: '100k', tier: 3 },
  { slug: 'solan', name: 'Solan', state: 'Himachal Pradesh', stateSlug: 'himachal-pradesh', population: '100k', tier: 3 },
  { slug: 'mandi', name: 'Mandi', state: 'Himachal Pradesh', stateSlug: 'himachal-pradesh', population: '50k', tier: 3 },
  // Kerala (more)
  { slug: 'kochi', name: 'Kochi', state: 'Kerala', stateSlug: 'kerala', population: '2 million', tier: 2 },
  { slug: 'kozhikode', name: 'Kozhikode', state: 'Kerala', stateSlug: 'kerala', population: '900k', tier: 3 },
  { slug: 'thrissur', name: 'Thrissur', state: 'Kerala', stateSlug: 'kerala', population: '700k', tier: 3 },
  { slug: 'trivandrum', name: 'Thiruvananthapuram', state: 'Kerala', stateSlug: 'kerala', population: '1 million', tier: 2 },
  { slug: 'kollam', name: 'Kollam', state: 'Kerala', stateSlug: 'kerala', population: '400k', tier: 3 },
  { slug: 'alappuzha', name: 'Alappuzha', state: 'Kerala', stateSlug: 'kerala', population: '200k', tier: 3 },
  { slug: 'palakkad', name: 'Palakkad', state: 'Kerala', stateSlug: 'kerala', population: '300k', tier: 3 },
  // Goa (more)
  { slug: 'panaji', name: 'Panaji', state: 'Goa', stateSlug: 'goa', population: '100k', tier: 3 },
  { slug: 'margao', name: 'Margao', state: 'Goa', stateSlug: 'goa', population: '100k', tier: 3 },
  { slug: 'vasco', name: 'Vasco da Gama', state: 'Goa', stateSlug: 'goa', population: '100k', tier: 3 },
  // Assam (more)
  { slug: 'guwahati', name: 'Guwahati', state: 'Assam', stateSlug: 'assam', population: '1 million', tier: 2 },
  { slug: 'silchar', name: 'Silchar', state: 'Assam', stateSlug: 'assam', population: '200k', tier: 3 },
  { slug: 'dibrugarh', name: 'Dibrugarh', state: 'Assam', stateSlug: 'assam', population: '200k', tier: 3 },
  { slug: 'jorhat', name: 'Jorhat', state: 'Assam', stateSlug: 'assam', population: '150k', tier: 3 },
  { slug: 'tezpur', name: 'Tezpur', state: 'Assam', stateSlug: 'assam', population: '100k', tier: 3 },
  // Delhi NCR (more)
  { slug: 'new-delhi', name: 'New Delhi', state: 'Delhi', stateSlug: 'delhi', population: '300k', tier: 1 },
  { slug: 'greater-noida', name: 'Greater Noida', state: 'Uttar Pradesh', stateSlug: 'uttar-pradesh', population: '500k', tier: 2 },
  // Rajasthan (more)
  { slug: 'churu', name: 'Churu', state: 'Rajasthan', stateSlug: 'rajasthan', population: '150k', tier: 3 },
  { slug: 'hanumangarh', name: 'Hanumangarh', state: 'Rajasthan', stateSlug: 'rajasthan', population: '200k', tier: 3 },
  { slug: 'dungarpur', name: 'Dungarpur', state: 'Rajasthan', stateSlug: 'rajasthan', population: '100k', tier: 3 },
  // Maharashtra (more)
  { slug: 'mira-bhayandar', name: 'Mira-Bhayandar', state: 'Maharashtra', stateSlug: 'maharashtra', population: '800k', tier: 2 },
  { slug: 'panvel', name: 'Panvel', state: 'Maharashtra', stateSlug: 'maharashtra', population: '200k', tier: 3 },
  { slug: 'sangli', name: 'Sangli', state: 'Maharashtra', stateSlug: 'maharashtra', population: '500k', tier: 3 },
  { slug: 'jalgaon', name: 'Jalgaon', state: 'Maharashtra', stateSlug: 'maharashtra', population: '500k', tier: 3 },
  { slug: 'akola', name: 'Akola', state: 'Maharashtra', stateSlug: 'maharashtra', population: '450k', tier: 3 },
  { slug: 'latur', name: 'Latur', state: 'Maharashtra', stateSlug: 'maharashtra', population: '400k', tier: 3 },
  // Gujarat (more)
  { slug: 'navsari', name: 'Navsari', state: 'Gujarat', stateSlug: 'gujarat', population: '200k', tier: 3 },
  { slug: 'bhuj', name: 'Bhuj', state: 'Gujarat', stateSlug: 'gujarat', population: '200k', tier: 3 },
  { slug: 'nadiad', name: 'Nadiad', state: 'Gujarat', stateSlug: 'gujarat', population: '250k', tier: 3 },
  { slug: 'morbi', name: 'Morbi', state: 'Gujarat', stateSlug: 'gujarat', population: '200k', tier: 3 },
  // UP (more)
  { slug: 'firozabad', name: 'Firozabad', state: 'Uttar Pradesh', stateSlug: 'uttar-pradesh', population: '600k', tier: 3 },
  { slug: 'jhansi', name: 'Jhansi', state: 'Uttar Pradesh', stateSlug: 'uttar-pradesh', population: '500k', tier: 3 },
  { slug: 'muzaffarnagar', name: 'Muzaffarnagar', state: 'Uttar Pradesh', stateSlug: 'uttar-pradesh', population: '500k', tier: 3 },
  { slug: 'shahjahanpur', name: 'Shahjahanpur', state: 'Uttar Pradesh', stateSlug: 'uttar-pradesh', population: '350k', tier: 3 },
  { slug: 'raebareli', name: 'Raebareli', state: 'Uttar Pradesh', stateSlug: 'uttar-pradesh', population: '250k', tier: 3 },
  { slug: 'ayodhya', name: 'Ayodhya', state: 'Uttar Pradesh', stateSlug: 'uttar-pradesh', population: '100k', tier: 3 },
  // Bihar (more)
  { slug: 'begusarai', name: 'Begusarai', state: 'Bihar', stateSlug: 'bihar', population: '300k', tier: 3 },
  { slug: 'katihar', name: 'Katihar', state: 'Bihar', stateSlug: 'bihar', population: '250k', tier: 3 },
  { slug: 'sasaram', name: 'Sasaram', state: 'Bihar', stateSlug: 'bihar', population: '150k', tier: 3 },
  // MP (more)
  { slug: 'burhanpur', name: 'Burhanpur', state: 'Madhya Pradesh', stateSlug: 'madhya-pradesh', population: '250k', tier: 3 },
  { slug: 'rewa', name: 'Rewa', state: 'Madhya Pradesh', stateSlug: 'madhya-pradesh', population: '250k', tier: 3 },
  { slug: 'satna', name: 'Satna', state: 'Madhya Pradesh', stateSlug: 'madhya-pradesh', population: '300k', tier: 3 },
  { slug: 'chhindwara', name: 'Chhindwara', state: 'Madhya Pradesh', stateSlug: 'madhya-pradesh', population: '200k', tier: 3 },
  // TN (more)
  { slug: 'nagercoil', name: 'Nagercoil', state: 'Tamil Nadu', stateSlug: 'tamil-nadu', population: '250k', tier: 3 },
  { slug: 'thoothukudi', name: 'Thoothukudi', state: 'Tamil Nadu', stateSlug: 'tamil-nadu', population: '400k', tier: 3 },
  { slug: 'dindigul', name: 'Dindigul', state: 'Tamil Nadu', stateSlug: 'tamil-nadu', population: '300k', tier: 3 },
  // Karnataka (more)
  { slug: 'udupi', name: 'Udupi', state: 'Karnataka', stateSlug: 'karnataka', population: '200k', tier: 3 },
  { slug: 'hospet', name: 'Hospet', state: 'Karnataka', stateSlug: 'karnataka', population: '250k', tier: 3 },
  { slug: 'tumkur', name: 'Tumkur', state: 'Karnataka', stateSlug: 'karnataka', population: '300k', tier: 3 },
  // Punjab (more)
  { slug: 'pathankot', name: 'Pathankot', state: 'Punjab', stateSlug: 'punjab', population: '200k', tier: 3 },
  { slug: 'hoshiarpur', name: 'Hoshiarpur', state: 'Punjab', stateSlug: 'punjab', population: '200k', tier: 3 },
  { slug: 'kapurthala', name: 'Kapurthala', state: 'Punjab', stateSlug: 'punjab', population: '150k', tier: 3 },
  // Haryana (more)
  { slug: 'yamunanagar', name: 'Yamunanagar', state: 'Haryana', stateSlug: 'haryana', population: '400k', tier: 3 },
  { slug: 'rewari', name: 'Rewari', state: 'Haryana', stateSlug: 'haryana', population: '200k', tier: 3 },
  { slug: 'bahadurgarh', name: 'Bahadurgarh', state: 'Haryana', stateSlug: 'haryana', population: '200k', tier: 3 },
  // Kerala (more)
  { slug: 'kannur', name: 'Kannur', state: 'Kerala', stateSlug: 'kerala', population: '250k', tier: 3 },
  { slug: 'kottayam', name: 'Kottayam', state: 'Kerala', stateSlug: 'kerala', population: '200k', tier: 3 },
  { slug: 'malappuram', name: 'Malappuram', state: 'Kerala', stateSlug: 'kerala', population: '200k', tier: 3 },
  // West Bengal (more)
  { slug: 'bardhaman', name: 'Bardhaman', state: 'West Bengal', stateSlug: 'west-bengal', population: '350k', tier: 3 },
  { slug: 'kharagpur', name: 'Kharagpur', state: 'West Bengal', stateSlug: 'west-bengal', population: '300k', tier: 3 },
  { slug: 'krishnanagar', name: 'Krishnanagar', state: 'West Bengal', stateSlug: 'west-bengal', population: '200k', tier: 3 },
  // Andhra (more)
  { slug: 'rajahmundry', name: 'Rajahmundry', state: 'Andhra Pradesh', stateSlug: 'andhra-pradesh', population: '500k', tier: 3 },
  { slug: 'ongole', name: 'Ongole', state: 'Andhra Pradesh', stateSlug: 'andhra-pradesh', population: '200k', tier: 3 },
  // Jharkhand (more)
  { slug: 'hazaribagh', name: 'Hazaribagh', state: 'Jharkhand', stateSlug: 'jharkhand', population: '200k', tier: 3 },
  { slug: 'ramgarh', name: 'Ramgarh', state: 'Jharkhand', stateSlug: 'jharkhand', population: '150k', tier: 3 },
  // Odisha (more)
  { slug: 'puri', name: 'Puri', state: 'Odisha', stateSlug: 'odisha', population: '200k', tier: 3 },
  { slug: 'balasore', name: 'Balasore', state: 'Odisha', stateSlug: 'odisha', population: '200k', tier: 3 },
]
