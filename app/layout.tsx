import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'Jhonata Selmo | TI, Automação, Dados e IA',description:'Mais de 15 anos de experiência em tecnologia, TI, BI e EdTechs. Conheça as habilidades e os projetos de Jhonata Selmo: JS Labs, CRM, Apura.IA, NORT.AI, Radar TI e automação.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body>{children}</body></html>}
