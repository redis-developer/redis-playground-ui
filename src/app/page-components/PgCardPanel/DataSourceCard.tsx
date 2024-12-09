import './DataSourceCard.css';

import CardFooter from './CardFooter';
import CardHeader from './CardHeader';
import CodeMirrorEditor from '../../components/CodeMirrorEditor';

interface DataSourceCardProps {
  dataSourceId: string;
}

const labels = {
  infoIconContent: 'A data source is a collection of data that we want to search.',
  headerTitle: 'DATA SOURCE',
  footerText: 'DISPLAYING 100 OF 10000 RECORDS',
}

let sampleInitialValue = `[
  {
    "_id": 1,
    "name": "Ribeira Charming Duplex",
    "accommodates": 8,
    "room_type": "Entire home/apt",
    "pricePerNight": 80,
    "host_name": "Ana&Gonçalo",
    "host_email": "anagonalo@gmail.com"
  },
  {
    "_id": 2,
    "name": "Horto flat with small garden",
    "accommodates": 4,
    "room_type": "Entire home/apt",
    "pricePerNight": 317,
    "host_name": "Ynaie",
    "host_email": "ynaie@gmail.com"
  },
  {
    "_id": 3,
    "name": "Ocean View Waikiki Marina w/prkg",
    "accommodates": 2,
    "room_type": "Entire home/apt",
    "pricePerNight": 115,
    "host_name": "David",
    "host_email": "david@gmail.com"
  },
  {
    "_id": 4,
    "name": "Private Room in Bushwick",
    "accommodates": 1,
    "room_type": "Private room",
    "pricePerNight": 40,
    "host_name": "Josh",
    "host_email": "josh@gmail.com"
  },
  {
    "_id": 5,
    "name": "Apt Linda Vista Lagoa - Rio",
    "accommodates": 2,
    "room_type": "Private room",
    "pricePerNight": 701,
    "host_name": "Livia",
    "host_email": "livia@gmail.com"
  },
  {
    "_id": 6,
    "name": "New York City - Upper West Side Apt",
    "accommodates": 2,
    "room_type": "Private room",
    "pricePerNight": 135,
    "host_name": "Greta",
    "host_email": "greta@gmail.com"
  },
  {
    "_id": 7,
    "name": "Copacabana Apartment Posto 6",
    "accommodates": 4,
    "room_type": "Entire home/apt",
    "pricePerNight": 119,
    "host_name": "Ana Valéria",
    "host_email": "ana@gmail.com"
  },
  {
    "_id": 8,
    "name": "Charming Flat in Downtown Moda",
    "accommodates": 6,
    "room_type": "Entire home/apt",
    "pricePerNight": 527,
    "host_name": "Zeynep",
    "host_email": "zeynep@gmail.com"
  },
  {
    "_id": 9,
    "name": "Catete's Colonial Big Hause Room B",
    "accommodates": 8,
    "room_type": "Private room",
    "pricePerNight": 250,
    "host_name": "Beatriz",
    "host_email": "beatriz@gmail.com"
  },
  {
    "_id": 10,
    "name": "Modern Spacious 1 Bedroom Loft",
    "accommodates": 4,
    "room_type": "Entire home/apt",
    "pricePerNight": 50,
    "host_name": "Konstantin",
    "host_email": "konstantin@gmail.com"
  },
  {
    "_id": 11,
    "name": "Deluxe Loft Suite",
    "accommodates": 4,
    "room_type": "Entire home/apt",
    "pricePerNight": 205,
    "host_name": "Mae",
    "host_email": "mae@gmail.com"
  },
  {
    "_id": 12,
    "name": "Ligne verte - à 15 min de métro du centre ville.",
    "accommodates": 2,
    "room_type": "Entire home/apt",
    "pricePerNight": 43,
    "host_name": "Caro",
    "host_email": "caro@gmail.com"
  },
  {
    "_id": 13,
    "name": "Soho Cozy, Spacious and Convenient",
    "accommodates": 3,
    "room_type": "Entire home/apt",
    "pricePerNight": 699,
    "host_name": "Giovanni",
    "host_email": "giovanni@gmail.com"
  },
  {
    "_id": 14,
    "name": "3 chambres au coeur du Plateau",
    "accommodates": 6,
    "room_type": "Entire home/apt",
    "pricePerNight": 140,
    "host_name": "Margaux",
    "host_email": "margaux@gmail.com"
  },
  {
    "_id": 15,
    "name": "Ótimo Apto proximo Parque Olimpico",
    "accommodates": 5,
    "room_type": "Entire home/apt",
    "pricePerNight": 858,
    "host_name": "Jonathan",
    "host_email": "jonathan@gmail.com"
  }
]`;

const DataSourceCard = ({ dataSourceId }: DataSourceCardProps) => {
  return <div className="data-source-card">
    <CardHeader headerTitle={labels.headerTitle} showCopyIcon={true} infoIconContent={labels.infoIconContent} />

    <CodeMirrorEditor initialValue={sampleInitialValue} mode="javascript" />

    <CardFooter footerText={labels.footerText} />
  </div>
}

export default DataSourceCard;