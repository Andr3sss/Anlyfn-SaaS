import {
  Inter, Outfit, Plus_Jakarta_Sans, DM_Sans, Manrope,
  Playfair_Display, Cormorant, Libre_Baskerville, EB_Garamond, Lora,
  Poppins, Nunito, Quicksand, Fredoka,
  Montserrat, Raleway, Josefin_Sans, Space_Grotesk,
  JetBrains_Mono, Space_Mono,
} from 'next/font/google'

// next/font/google requires literal option objects — no helpers or spreads allowed

const inter = Inter({ subsets: ['latin'], display: 'swap', weight: ['300', '400', '500', '600', '700', '800'] })
const outfit = Outfit({ subsets: ['latin'], display: 'swap', weight: ['300', '400', '500', '600', '700', '800'] })
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'], display: 'swap', weight: ['300', '400', '500', '600', '700', '800'] })
const dmSans = DM_Sans({ subsets: ['latin'], display: 'swap', weight: ['300', '400', '500', '600', '700', '800'] })
const manrope = Manrope({ subsets: ['latin'], display: 'swap', weight: ['300', '400', '500', '600', '700', '800'] })
const playfairDisplay = Playfair_Display({ subsets: ['latin'], display: 'swap', weight: ['400', '500', '600', '700', '800'] })
const cormorant = Cormorant({ subsets: ['latin'], display: 'swap', weight: ['300', '400', '500', '600', '700'] })
const libreBaskerville = Libre_Baskerville({ subsets: ['latin'], display: 'swap', weight: ['400', '500', '600', '700'] })
const ebGaramond = EB_Garamond({ subsets: ['latin'], display: 'swap', weight: ['400', '500', '600', '700', '800'] })
const lora = Lora({ subsets: ['latin'], display: 'swap', weight: ['400', '500', '600', '700'] })
const poppins = Poppins({ subsets: ['latin'], display: 'swap', weight: ['300', '400', '500', '600', '700', '800'] })
const nunito = Nunito({ subsets: ['latin'], display: 'swap', weight: ['300', '400', '500', '600', '700', '800'] })
const quicksand = Quicksand({ subsets: ['latin'], display: 'swap', weight: ['300', '400', '500', '600', '700'] })
const fredoka = Fredoka({ subsets: ['latin'], display: 'swap', weight: ['300', '400', '500', '600', '700'] })
const montserrat = Montserrat({ subsets: ['latin'], display: 'swap', weight: ['300', '400', '500', '600', '700', '800'] })
const raleway = Raleway({ subsets: ['latin'], display: 'swap', weight: ['300', '400', '500', '600', '700', '800'] })
const josefinSans = Josefin_Sans({ subsets: ['latin'], display: 'swap', weight: ['300', '400', '500', '600', '700'] })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], display: 'swap', weight: ['300', '400', '500', '600', '700'] })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], display: 'swap', weight: ['300', '400', '500', '600', '700', '800'] })
const spaceMono = Space_Mono({ subsets: ['latin'], display: 'swap', weight: ['400', '700'] })

export const FONT_MAP: Record<string, { className: string }> = {
  'inter':             inter,
  'outfit':            outfit,
  'plus-jakarta-sans': plusJakartaSans,
  'dm-sans':           dmSans,
  'manrope':           manrope,
  'playfair-display':  playfairDisplay,
  'cormorant':         cormorant,
  'libre-baskerville': libreBaskerville,
  'eb-garamond':       ebGaramond,
  'lora':              lora,
  'poppins':           poppins,
  'nunito':            nunito,
  'quicksand':         quicksand,
  'fredoka':           fredoka,
  'montserrat':        montserrat,
  'raleway':           raleway,
  'josefin-sans':      josefinSans,
  'space-grotesk':     spaceGrotesk,
  'jetbrains-mono':    jetbrainsMono,
  'space-mono':        spaceMono,
}

export function getFontByKey(key: string): { className: string } {
  return FONT_MAP[key] ?? inter
}
