import { Question } from '../types';

export const questions: Question[] = [
  // QCM Questions (75 questions - 50%)
  {
    id: 1,
    type: 'mcq',
    question: "Quelle est la signification de la triade CIA en cybersécurité ?",
    options: [
      "Chiffrement, Intégrité, Authentification",
      "Confidentialité, Intégrité, Disponibilité",
      "Cryptographie, Identification, Autorisation",
      "Contrôle, Inspection, Audit"
    ],
    correct: 1,
    category: "Fondamentaux"
  },
  {
    id: 2,
    type: 'mcq',
    question: "Quel protocole est optimal pour l'IoT longue portée et faible consommation ?",
    options: [
      "WiFi",
      "Bluetooth",
      "LoRaWAN",
      "Zigbee"
    ],
    correct: 2,
    category: "Protocoles IoT"
  },
  {
    id: 3,
    type: 'mcq',
    question: "Que signifie AES en cryptographie ?",
    options: [
      "Advanced Encryption Standard",
      "Asymmetric Encryption System",
      "Authenticated Encryption Scheme",
      "Advanced Electronic Security"
    ],
    correct: 0,
    category: "Cryptographie"
  },
  {
    id: 4,
    type: 'mcq',
    question: "Quelle est la principale vulnérabilité OWASP IoT Top 10 ?",
    options: [
      "Mots de passe faibles",
      "Interface réseau non sécurisée",
      "Chiffrement insuffisant",
      "Mise à jour du firmware manquante"
    ],
    correct: 0,
    category: "Sécurité IoT"
  },
  {
    id: 5,
    type: 'mcq',
    question: "Quel est l'avantage principal de l'Edge Computing pour l'IoT ?",
    options: [
      "Réduction des coûts de stockage",
      "Latence réduite et traitement local",
      "Meilleure sécurité des données",
      "Simplicité de déploiement"
    ],
    correct: 1,
    category: "Edge Computing"
  },
  {
    id: 6,
    type: 'mcq',
    question: "Quelle méthode d'authentification est la plus sécurisée pour l'IoT ?",
    options: [
      "Mot de passe statique",
      "Certificats X.509",
      "Clé pré-partagée",
      "Token temporaire"
    ],
    correct: 1,
    category: "Authentification"
  },
  {
    id: 7,
    type: 'mcq',
    question: "Quel standard définit la sécurité des réseaux sans fil ?",
    options: [
      "WPA3",
      "TLS 1.3",
      "IPSec",
      "HTTPS"
    ],
    correct: 0,
    category: "Réseaux Sans Fil"
  },
  {
    id: 8,
    type: 'mcq',
    question: "Dans l'architecture IoT, que désigne le terme 'fog computing' ?",
    options: [
      "Stockage distribué dans le cloud",
      "Traitement intermédiaire entre edge et cloud",
      "Chiffrement des données en transit",
      "Virtualisation des capteurs"
    ],
    correct: 1,
    category: "Architecture IoT"
  },
  {
    id: 9,
    type: 'mcq',
    question: "Quel algorithme de hachage est recommandé pour les signatures numériques ?",
    options: [
      "MD5",
      "SHA-1",
      "SHA-256",
      "CRC32"
    ],
    correct: 2,
    category: "Cryptographie"
  },
  {
    id: 10,
    type: 'mcq',
    question: "Quelle attaque vise spécifiquement les objets IoT connectés ?",
    options: [
      "SQL Injection",
      "Botnet Mirai",
      "Cross-Site Scripting",
      "Buffer Overflow"
    ],
    correct: 1,
    category: "Attaques IoT"
  },
  {
    id: 11,
    type: 'mcq',
    question: "Quel protocole assure la sécurité des communications MQTT ?",
    options: [
      "MQTT-S",
      "MQTT over TLS/SSL",
      "MQTT-Auth",
      "Secure-MQTT"
    ],
    correct: 1,
    category: "Protocoles IoT"
  },
  {
    id: 12,
    type: 'mcq',
    question: "Qu'est-ce qu'un HSM (Hardware Security Module) ?",
    options: [
      "Un logiciel de chiffrement",
      "Un dispositif physique de sécurisation des clés",
      "Un protocole de communication sécurisé",
      "Une méthode d'authentification biométrique"
    ],
    correct: 1,
    category: "Hardware Security"
  },
  {
    id: 13,
    type: 'mcq',
    question: "Quelle est la différence principale entre symétrique et asymétrique ?",
    options: [
      "La vitesse de chiffrement",
      "Le nombre de clés utilisées",
      "La taille des clés",
      "La complexité algorithmique"
    ],
    correct: 1,
    category: "Cryptographie"
  },
  {
    id: 14,
    type: 'mcq',
    question: "Quel est l'objectif principal d'un honeypot en cybersécurité ?",
    options: [
      "Accélérer le réseau",
      "Détecter et analyser les attaques",
      "Chiffrer les communications",
      "Sauvegarder les données"
    ],
    correct: 1,
    category: "Détection d'intrusion"
  },
  {
    id: 15,
    type: 'mcq',
    question: "Dans l'IoT, que signifie LPWAN ?",
    options: [
      "Low Power Wide Area Network",
      "Long Range Personal Area Network",
      "Local Private Wireless Access Network",
      "Limited Protocol Wireless Application Network"
    ],
    correct: 0,
    category: "Réseaux IoT"
  },
  {
    id: 16,
    type: 'mcq',
    question: "Quel principe de sécurité recommande de donner le minimum de privilèges nécessaires ?",
    options: [
      "Défense en profondeur",
      "Principe de moindre privilège",
      "Séparation des tâches",
      "Contrôle d'accès obligatoire"
    ],
    correct: 1,
    category: "Principes de sécurité"
  },
  {
    id: 17,
    type: 'mcq',
    question: "Quelle technologie permet l'identification unique des objets IoT ?",
    options: [
      "RFID",
      "GPS",
      "Blockchain",
      "Machine Learning"
    ],
    correct: 0,
    category: "Identification IoT"
  },
  {
    id: 18,
    type: 'mcq',
    question: "Dans le contexte IoT, qu'est-ce qu'un gateway ?",
    options: [
      "Un capteur intelligent",
      "Un point d'accès WiFi",
      "Un intermédiaire entre capteurs et cloud",
      "Un serveur de base de données"
    ],
    correct: 2,
    category: "Architecture IoT"
  },
  {
    id: 19,
    type: 'mcq',
    question: "Quelle méthode de chiffrement utilise la même clé pour chiffrer et déchiffrer ?",
    options: [
      "Chiffrement asymétrique",
      "Chiffrement symétrique",
      "Hachage cryptographique",
      "Signature numérique"
    ],
    correct: 1,
    category: "Cryptographie"
  },
  {
    id: 20,
    type: 'mcq',
    question: "Que signifie DDoS ?",
    options: [
      "Distributed Denial of Service",
      "Direct Database Operating System",
      "Dynamic Data Output Stream",
      "Dedicated Device Operating Security"
    ],
    correct: 0,
    category: "Attaques réseau"
  },
  {
    id: 21,
    type: 'mcq',
    question: "Quel protocole est utilisé pour la gestion sécurisée des certificats ?",
    options: [
      "OCSP",
      "DHCP",
      "DNS",
      "FTP"
    ],
    correct: 0,
    category: "PKI"
  },
  {
    id: 22,
    type: 'mcq',
    question: "Dans l'IoT industriel, que signifie OT ?",
    options: [
      "Object Technology",
      "Operational Technology",
      "Online Transaction",
      "Optical Transmission"
    ],
    correct: 1,
    category: "IoT Industriel"
  },
  {
    id: 23,
    type: 'mcq',
    question: "Quel est le port standard pour HTTPS ?",
    options: [
      "80",
      "443",
      "22",
      "21"
    ],
    correct: 1,
    category: "Protocoles réseau"
  },
  {
    id: 24,
    type: 'mcq',
    question: "Qu'est-ce que le RGPD ?",
    options: [
      "Règlement Général sur la Protection des Données",
      "Réseau Global de Protection Digitale",
      "Registre de Gestion des Protocoles de Données",
      "Règles Générales de Programmation Distribuée"
    ],
    correct: 0,
    category: "Réglementation"
  },
  {
    id: 25,
    type: 'mcq',
    question: "Quelle est la taille de clé standard pour AES ?",
    options: [
      "64, 128, 192 bits",
      "128, 192, 256 bits",
      "256, 512, 1024 bits",
      "1024, 2048, 4096 bits"
    ],
    correct: 1,
    category: "Cryptographie"
  },
  {
    id: 26,
    type: 'mcq',
    question: "Que signifie VPN ?",
    options: [
      "Virtual Private Network",
      "Verified Personal Network",
      "Visual Protocol Navigation",
      "Variable Port Number"
    ],
    correct: 0,
    category: "Sécurité réseau"
  },
  {
    id: 27,
    type: 'mcq',
    question: "Quel protocole IoT utilise un modèle publish-subscribe ?",
    options: [
      "HTTP",
      "MQTT",
      "FTP",
      "SMTP"
    ],
    correct: 1,
    category: "Protocoles IoT"
  },
  {
    id: 28,
    type: 'mcq',
    question: "Qu'est-ce qu'un firewall de nouvelle génération (NGFW) ?",
    options: [
      "Un pare-feu avec inspection applicative",
      "Un pare-feu wireless seulement",
      "Un pare-feu logiciel uniquement",
      "Un pare-feu pour IPv6"
    ],
    correct: 0,
    category: "Sécurité réseau"
  },
  {
    id: 29,
    type: 'mcq',
    question: "Quelle attaque exploite les vulnérabilités des applications web ?",
    options: [
      "Man-in-the-Middle",
      "SQL Injection",
      "Déni de service",
      "Sniffing"
    ],
    correct: 1,
    category: "Sécurité web"
  },
  {
    id: 30,
    type: 'mcq',
    question: "Dans l'IoT, que signifie M2M ?",
    options: [
      "Machine to Machine",
      "Mobile to Mobile",
      "Memory to Memory",
      "Mesh to Mesh"
    ],
    correct: 0,
    category: "Communication IoT"
  },
  {
    id: 31,
    type: 'mcq',
    question: "Quel est le principe de la signature numérique ?",
    options: [
      "Chiffrement avec clé publique",
      "Chiffrement avec clé privée",
      "Hachage simple",
      "Compression de données"
    ],
    correct: 1,
    category: "Cryptographie"
  },
  {
    id: 32,
    type: 'mcq',
    question: "Que signifie IDS en sécurité ?",
    options: [
      "Internet Data Security",
      "Intrusion Detection System",
      "Integrated Defense Solution",
      "Identity Database System"
    ],
    correct: 1,
    category: "Détection d'intrusion"
  },
  {
    id: 33,
    type: 'mcq',
    question: "Quel protocole sécurise les communications SSH ?",
    options: [
      "SSL/TLS",
      "IPSec",
      "Protocole SSH natif",
      "HTTPS"
    ],
    correct: 2,
    category: "Protocoles sécurisés"
  },
  {
    id: 34,
    type: 'mcq',
    question: "Dans l'IoT, qu'est-ce qu'un actuateur ?",
    options: [
      "Un dispositif de mesure",
      "Un dispositif d'action sur l'environnement",
      "Un protocole de communication",
      "Un système d'authentification"
    ],
    correct: 1,
    category: "Composants IoT"
  },
  {
    id: 35,
    type: 'mcq',
    question: "Quelle est la fréquence ISM utilisée par LoRaWAN en Europe ?",
    options: [
      "433 MHz",
      "868 MHz",
      "915 MHz",
      "2.4 GHz"
    ],
    correct: 1,
    category: "Fréquences IoT"
  },
  {
    id: 36,
    type: 'mcq',
    question: "Qu'est-ce que le Zero Trust ?",
    options: [
      "Un modèle de sécurité sans confiance implicite",
      "Un protocole de chiffrement",
      "Une méthode d'authentification",
      "Un type de pare-feu"
    ],
    correct: 0,
    category: "Modèles de sécurité"
  },
  {
    id: 37,
    type: 'mcq',
    question: "Quel algorithme asymétrique est basé sur les courbes elliptiques ?",
    options: [
      "RSA",
      "DES",
      "ECC",
      "AES"
    ],
    correct: 2,
    category: "Cryptographie"
  },
  {
    id: 38,
    type: 'mcq',
    question: "Que signifie SIEM ?",
    options: [
      "Security Information and Event Management",
      "System Integration and Error Monitoring",
      "Secure Internet Email Management",
      "Software Installation and Environment Management"
    ],
    correct: 0,
    category: "Gestion de sécurité"
  },
  {
    id: 39,
    type: 'mcq',
    question: "Quel est le rôle principal d'un Certificate Authority (CA) ?",
    options: [
      "Chiffrer les données",
      "Émettre et valider les certificats numériques",
      "Gérer les mots de passe",
      "Surveiller le réseau"
    ],
    correct: 1,
    category: "PKI"
  },
  {
    id: 40,
    type: 'mcq',
    question: "Dans l'IoT, que signifie CoAP ?",
    options: [
      "Constrained Application Protocol",
      "Communication Access Point",
      "Centralized Operation and Control Protocol",
      "Cloud Application Protocol"
    ],
    correct: 0,
    category: "Protocoles IoT"
  },
  {
    id: 41,
    type: 'mcq',
    question: "Quel type d'attaque utilise des botnets IoT ?",
    options: [
      "Phishing",
      "DDoS amplification",
      "SQL Injection",
      "Cross-site scripting"
    ],
    correct: 1,
    category: "Attaques IoT"
  },
  {
    id: 42,
    type: 'mcq',
    question: "Qu'est-ce que l'ANSSI ?",
    options: [
      "Agence Nationale de la Sécurité des Systèmes d'Information",
      "Association Nationale des Services de Sécurité Informatique",
      "Autorité de Normalisation des Systèmes et Solutions Informatiques",
      "Alliance Nationale pour la Sécurité et la Surveillance Internet"
    ],
    correct: 0,
    category: "Organismes de sécurité"
  },
  {
    id: 43,
    type: 'mcq',
    question: "Quel protocole permet la découverte automatique des services réseau ?",
    options: [
      "mDNS/Bonjour",
      "DHCP",
      "DNS",
      "ARP"
    ],
    correct: 0,
    category: "Protocoles réseau"
  },
  {
    id: 44,
    type: 'mcq',
    question: "Dans la sécurité IoT, que signifie OTA ?",
    options: [
      "Over The Air",
      "Operational Technology Assessment",
      "Open Transport Architecture",
      "Object Tracking Algorithm"
    ],
    correct: 0,
    category: "Mise à jour IoT"
  },
  {
    id: 45,
    type: 'mcq',
    question: "Quel est le principal avantage de Zigbee pour l'IoT ?",
    options: [
      "Très longue portée",
      "Réseau maillé auto-organisé",
      "Très haut débit",
      "Compatibilité WiFi"
    ],
    correct: 1,
    category: "Protocoles IoT"
  },
  {
    id: 46,
    type: 'mcq',
    question: "Qu'est-ce qu'une API REST ?",
    options: [
      "Une interface de programmation utilisant HTTP",
      "Un protocole de chiffrement",
      "Un système d'authentification",
      "Un type de base de données"
    ],
    correct: 0,
    category: "Architecture logicielle"
  },
  {
    id: 47,
    type: 'mcq',
    question: "Quel est l'objectif du hardening système ?",
    options: [
      "Améliorer les performances",
      "Réduire la surface d'attaque",
      "Faciliter la maintenance",
      "Augmenter la capacité de stockage"
    ],
    correct: 1,
    category: "Durcissement système"
  },
  {
    id: 48,
    type: 'mcq',
    question: "Dans l'IoT, que signifie WSN ?",
    options: [
      "Wireless Sensor Network",
      "Wide Service Network",
      "Web Security Node",
      "Wired System Network"
    ],
    correct: 0,
    category: "Réseaux de capteurs"
  },
  {
    id: 49,
    type: 'mcq',
    question: "Quel algorithme de hachage est considéré comme obsolète ?",
    options: [
      "SHA-256",
      "SHA-3",
      "MD5",
      "BLAKE2"
    ],
    correct: 2,
    category: "Cryptographie"
  },
  {
    id: 50,
    type: 'mcq',
    question: "Qu'est-ce que l'authentification à deux facteurs (2FA) ?",
    options: [
      "Deux mots de passe différents",
      "Authentification basée sur deux éléments distincts",
      "Deux tentatives de connexion",
      "Authentification sur deux serveurs"
    ],
    correct: 1,
    category: "Authentification"
  },
  {
    id: 51,
    type: 'mcq',
    question: "Dans l'architecture IoT, quelle couche gère la connectivité ?",
    options: [
      "Couche application",
      "Couche réseau",
      "Couche perception",
      "Couche middleware"
    ],
    correct: 1,
    category: "Architecture IoT"
  },
  {
    id: 52,
    type: 'mcq',
    question: "Quel protocole est utilisé pour la synchronisation temporelle ?",
    options: [
      "NTP",
      "SNMP",
      "LDAP",
      "DHCP"
    ],
    correct: 0,
    category: "Protocoles réseau"
  },
  {
    id: 53,
    type: 'mcq',
    question: "Qu'est-ce qu'un Man-in-the-Middle (MITM) ?",
    options: [
      "Un serveur proxy",
      "Une attaque d'interception de communication",
      "Un protocole de routage",
      "Un type de pare-feu"
    ],
    correct: 1,
    category: "Attaques réseau"
  },
  {
    id: 54,
    type: 'mcq',
    question: "Dans l'IoT, que permet le protocole 6LoWPAN ?",
    options: [
      "IPv6 sur réseaux contraints",
      "Chiffrement des données",
      "Gestion d'énergie",
      "Interface utilisateur"
    ],
    correct: 0,
    category: "Protocoles IoT"
  },
  {
    id: 55,
    type: 'mcq',
    question: "Quel est l'objectif principal de l'analyse forensique ?",
    options: [
      "Prévenir les attaques",
      "Améliorer les performances",
      "Investiguer les incidents de sécurité",
      "Chiffrer les données"
    ],
    correct: 2,
    category: "Investigation numérique"
  },
  {
    id: 56,
    type: 'mcq',
    question: "Qu'est-ce que le Social Engineering ?",
    options: [
      "Développement de logiciels sociaux",
      "Manipulation psychologique pour obtenir des informations",
      "Gestion des réseaux sociaux",
      "Architecture de systèmes collaboratifs"
    ],
    correct: 1,
    category: "Ingénierie sociale"
  },
  {
    id: 57,
    type: 'mcq',
    question: "Dans l'IoT, quel est l'avantage principal de NB-IoT ?",
    options: [
      "Très haut débit",
      "Couverture cellulaire étendue et faible consommation",
      "Protocole open source",
      "Compatibilité WiFi"
    ],
    correct: 1,
    category: "Connectivité cellulaire"
  },
  {
    id: 58,
    type: 'mcq',
    question: "Que signifie PKI ?",
    options: [
      "Public Key Infrastructure",
      "Private Key Integration",
      "Protected Kernel Interface",
      "Portable Key Identification"
    ],
    correct: 0,
    category: "Infrastructure de clés"
  },
  {
    id: 59,
    type: 'mcq',
    question: "Quel est le rôle d'un SOC en cybersécurité ?",
    options: [
      "Développement logiciel",
      "Surveillance et réponse aux incidents",
      "Gestion des ressources humaines",
      "Maintenance matérielle"
    ],
    correct: 1,
    category: "Centre de sécurité"
  },
  {
    id: 60,
    type: 'mcq',
    question: "Dans l'IoT médical, qu'est-ce qu'un WPAN ?",
    options: [
      "Wireless Personal Area Network",
      "Wide Protocol Access Network",
      "Web Portal Application Network",
      "Wired Private Access Node"
    ],
    correct: 0,
    category: "IoT médical"
  },
  {
    id: 61,
    type: 'mcq',
    question: "Quel standard IEEE définit le WiFi ?",
    options: [
      "IEEE 802.3",
      "IEEE 802.11",
      "IEEE 802.15",
      "IEEE 802.16"
    ],
    correct: 1,
    category: "Standards réseau"
  },
  {
    id: 62,
    type: 'mcq',
    question: "Qu'est-ce que le threat modeling ?",
    options: [
      "Modélisation des performances",
      "Analyse structurée des menaces de sécurité",
      "Conception d'architecture",
      "Test de logiciels"
    ],
    correct: 1,
    category: "Analyse de menaces"
  },
  {
    id: 63,
    type: 'mcq',
    question: "Dans l'IoT, que signifie LPWA ?",
    options: [
      "Low Power Wide Area",
      "Local Private Wireless Access",
      "Long Protocol Web Application",
      "Limited Power Wireless Antenna"
    ],
    correct: 0,
    category: "Technologies LPWA"
  },
  {
    id: 64,
    type: 'mcq',
    question: "Quel est l'objectif du chiffrement homomorphe ?",
    options: [
      "Chiffrer plus rapidement",
      "Calculer sur des données chiffrées",
      "Réduire la taille des clés",
      "Améliorer l'authentification"
    ],
    correct: 1,
    category: "Cryptographie avancée"
  },
  {
    id: 65,
    type: 'mcq',
    question: "Qu'est-ce qu'un pentest ?",
    options: [
      "Test de performance",
      "Test d'intrusion autorisé",
      "Test de compatibilité",
      "Test de charge"
    ],
    correct: 1,
    category: "Tests de sécurité"
  },
  {
    id: 66,
    type: 'mcq',
    question: "Dans l'IoT industriel, que signifie SCADA ?",
    options: [
      "Supervisory Control and Data Acquisition",
      "Secure Communication and Device Authentication",
      "System Configuration and Device Administration",
      "Smart Control and Data Analysis"
    ],
    correct: 0,
    category: "Systèmes industriels"
  },
  {
    id: 67,
    type: 'mcq',
    question: "Quel protocole permet l'authentification réseau centralisée ?",
    options: [
      "RADIUS",
      "DHCP",
      "DNS",
      "SNMP"
    ],
    correct: 0,
    category: "Authentification réseau"
  },
  {
    id: 68,
    type: 'mcq',
    question: "Qu'est-ce que l'obfuscation de code ?",
    options: [
      "Optimisation du code",
      "Rendre le code difficile à comprendre",
      "Compression du code",
      "Documentation du code"
    ],
    correct: 1,
    category: "Sécurité logicielle"
  },
  {
    id: 69,
    type: 'mcq',
    question: "Dans l'IoT, quel est l'avantage de Sigfox ?",
    options: [
      "Très haut débit",
      "Communication bidirectionnelle",
      "Couverture globale et faible coût",
      "Protocole ouvert"
    ],
    correct: 2,
    category: "Réseaux LPWAN"
  },
  {
    id: 70,
    type: 'mcq',
    question: "Que signifie GDPR en anglais ?",
    options: [
      "General Data Protection Regulation",
      "Global Digital Privacy Rules",
      "Government Data Processing Requirements",
      "Generic Database Protection Rights"
    ],
    correct: 0,
    category: "Réglementation internationale"
  },
  {
    id: 71,
    type: 'mcq',
    question: "Quel est le principe de la cryptographie quantique ?",
    options: [
      "Utilisation de qubits pour le chiffrement",
      "Chiffrement très rapide",
      "Clés de très grande taille",
      "Algorithmes adaptatifs"
    ],
    correct: 0,
    category: "Cryptographie quantique"
  },
  {
    id: 72,
    type: 'mcq',
    question: "Dans l'IoT, qu'est-ce qu'un Digital Twin ?",
    options: [
      "Une copie de sauvegarde",
      "Un jumeau numérique d'un objet physique",
      "Un protocole de synchronisation",
      "Un système de redondance"
    ],
    correct: 1,
    category: "Jumeaux numériques"
  }
];

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
