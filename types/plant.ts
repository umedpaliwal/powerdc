export interface Plant {
  // Basic identification
  id?: string;
  name?: string;
  type?: string;
  
  // Detailed plant properties
  fac_name: string;
  state_name: string;
  Utility_Name_g: string;
  Capacity: number;
  fac_vc: number;
  Solar_Capacity: number;
  Wind_Capacity: number;
  Category: string;
  longitude: number;
  latitude: number;
  Balancing_Authority_Name_p: string;
  urban_area_perc: number;
}