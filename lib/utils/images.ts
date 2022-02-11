const basecolor = 'basecolor.jpg'
const ambientOcclusion = 'ambientOcclusion.jpg'
const roughness = 'roughness.jpg'
const displacement = 'height.png'
const normal = 'normal.jpg'
const metal = 'metallic.jpg'

const imagesDir = '/images'
const crystalMetal = 'crystal_metal'
const damascusSteel = 'damascus_steel'
const greenCrystal = 'green_crystal'
const lava = 'lava'
const lapisLazuli = 'lapis_lazuli'

export const StaticImages = {
  profile: `${imagesDir}/profile.jpg`,
  sun: `${imagesDir}/8k_sun.jpg`,
  neptune: `${imagesDir}/2k_neptune.jpg`,
  jupiter: `${imagesDir}/8k_jupiter.jpg`,
  mars: {
    basecolor: `${imagesDir}/8k_mars.jpg`,
    normal: `${imagesDir}/12k_mars_normal.jpg`,
  },
  interstellarSpace: `${imagesDir}/large_space.jpg`,
  crystalMetal: {
    basecolor: `${imagesDir}/${crystalMetal}/${basecolor}`,
    ao: `${imagesDir}/${crystalMetal}/${ambientOcclusion}`,
    roughness: `${imagesDir}/${crystalMetal}/${roughness}`,
    displacement: `${imagesDir}/${crystalMetal}/${displacement}`,
    normal: `${imagesDir}/${crystalMetal}/${normal}`,
  },
  damascusSteel: {
    basecolor: `${imagesDir}/${damascusSteel}/${basecolor}`,
    ao: `${imagesDir}/${damascusSteel}/${ambientOcclusion}`,
    roughness: `${imagesDir}/${damascusSteel}/${roughness}`,
    displacement: `${imagesDir}/${damascusSteel}/${displacement}`,
    normal: `${imagesDir}/${damascusSteel}/${normal}`,
    metal: `${imagesDir}/${damascusSteel}/${metal}`,
  },
  greenCrystal: {
    basecolor: `${imagesDir}/${greenCrystal}/${basecolor}`,
    ao: `${imagesDir}/${greenCrystal}/${ambientOcclusion}`,
    roughness: `${imagesDir}/${greenCrystal}/${roughness}`,
    displacement: `${imagesDir}/${greenCrystal}/${displacement}`,
    normal: `${imagesDir}/${greenCrystal}/${normal}`,
  },
  lava: {
    basecolor: `${imagesDir}/${lava}/${basecolor}`,
    ao: `${imagesDir}/${lava}/${ambientOcclusion}`,
    roughness: `${imagesDir}/${lava}/${roughness}`,
    displacement: `${imagesDir}/${lava}/${displacement}`,
    normal: `${imagesDir}/${lava}/${normal}`,
  },
  lapisLazuli: {
    basecolor: `${imagesDir}/${lapisLazuli}/${basecolor}`,
    ao: `${imagesDir}/${lapisLazuli}/${ambientOcclusion}`,
    roughness: `${imagesDir}/${lapisLazuli}/${roughness}`,
    displacement: `${imagesDir}/${lapisLazuli}/${displacement}`,
    normal: `${imagesDir}/${lapisLazuli}/${normal}`,
  },
}