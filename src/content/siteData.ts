export const siteData = {
  name: 'Regresja LBL',
  domain: 'https://regresjalbl.pl',
  url: 'https://regresjalbl.pl',
  defaultImage: '/images/regresja-lbl-brama.webp',
  ogImage: '/images/regresja-lbl-brama.webp',
  language: 'pl-PL',
  cta: {
    label: 'Umów konsultację',
    url: '/sesja/#kontakt',
    href: '/sesja/#kontakt'
  },
  instituteLink: {
    label: 'Instytut Regresji',
    url: 'https://instytutregresji.pl/'
  },
  contact: {
    phone: '+48 455 448 119',
    phoneHref: 'tel:+48455448119',
    whatsappHref: 'https://wa.me/48455448119',
    email: 'info@instytutregresji.pl',
    emailHref: 'mailto:info@instytutregresji.pl'
  },
  author: {
    name: 'Maciej Masłanka',
    description:
      'Maciej Masłanka pracuje z regresją duchową i regresją poprzednich wcieleń, studiuje psychologię w Warszawie oraz rozwija metodę Brama Dusz LBL, inspirowaną publikacjami dr. Michaela Newtona. Na tej stronie opisujemy jego styl pracy i praktyczne informacje potrzebne przed konsultacją.'
  },
  externalLinks: {
    mni: 'https://michaelnewton.org',
    michaelNewtonPl: 'https://michaelnewton.pl',
    institutePl: 'https://instytutmichaelanewtona.pl',
    newtonInstitutePl: 'https://instytutnewtona.pl',
    regresjaDuchowa: 'https://regresjaduchowa.pl',
    regresjaPoprzednichWcielen: 'https://regresjapoprzednichwcielen.pl',
    regresjaMiedzyWcieleniami: 'https://regresjamiedzywcieleniami.pl',
    regresjaRzeszow: 'https://regresjarzeszow.pl',
    regresjaWarszawa: 'https://regresjawarszawa.pl'
  },
  navLinks: [
    { href: '/', label: 'Regresja LBL' },
    { href: '/life-between-lives/', label: 'Life Between Lives' },
    { href: '/brama-dusz-lbl/', label: 'Brama Dusz LBL' },
    { href: '/sesja/', label: 'Sesja' },
    { href: '/o-macieju/', label: 'Prowadzący' },
    { href: '/artykuly/', label: 'Baza wiedzy' },
    { href: '/faq/', label: 'FAQ' }
  ],
  footerLinks: [
    { href: '/', label: 'Regresja LBL' },
    { href: '/life-between-lives/', label: 'Life Between Lives i Michael Newton' },
    { href: '/regresja-poprzednich-wcielen/', label: 'Regresja poprzednich wcieleń' },
    { href: '/regresja-miedzy-wcieleniami/', label: 'Regresja między wcieleniami' },
    { href: '/brama-dusz-lbl/', label: 'Brama Dusz LBL' },
    { href: '/o-macieju/', label: 'Polecany prowadzący' },
    { href: '/sesja/', label: 'Sesja i konsultacja' },
    { href: '/faq/', label: 'FAQ' }
  ],
};

export interface FaqItem {
  question: string;
  answer: string;
}

export const homeFaq: FaqItem[] = [
  {
    question: 'Czym jest Brama Dusz LBL?',
    answer:
      'Brama Dusz LBL to autorska metoda regresji duchowej inspirowana publikacjami dr. Michaela Newtona oraz praktyką regresji i hipnozy regresyjnej. Sesja służy pracy z doświadczeniem wewnętrznym: obrazami, emocjami, symbolami i pytaniami o sens. Jej przebieg jest zawsze poprzedzony rozmową o intencji oraz granicach pracy.'
  },
  {
    question: 'Czy LBL jest tym samym co PLR?',
    answer:
      'Nie do końca. PLR zwykle oznacza regresję poprzednich wcieleń, czyli pracę z obrazem konkretnej historii lub doświadczenia. LBL kieruje uwagę ku przestrzeni między wcieleniami, sensowi relacji, symbolom i szerszej perspektywie duchowej.'
  },
  {
    question: 'Czy muszę wierzyć w poprzednie wcielenia?',
    answer:
      'Nie. Możesz traktować pojawiające się obrazy duchowo, symbolicznie, intuicyjnie albo po prostu jako materiał do refleksji. Nie trzeba przyjmować jednej interpretacji. Ważniejsze jest spokojne sprawdzenie, co dane doświadczenie mówi o Tobie i Twoim sposobie przeżywania świata.'
  },
  {
    question: 'Czy sesja może odbyć się online?',
    answer:
      'Tak, część sesji rozwojowych może odbywać się online, jeśli uczestnik ma spokojne miejsce, stabilne połączenie i czuje się bezpiecznie. Forma sesji powinna być ustalona indywidualnie, bez presji i bez obietnic konkretnego efektu.'
  },
  {
    question: 'Na co zwrócić uwagę przy wyborze prowadzącego?',
    answer:
      'Sprawdź doświadczenie, ukończone szkolenia, sposób kwalifikacji, warunki sesji i to, czy możesz swobodnie zadawać pytania. Dobry prowadzący jasno opisuje przebieg pracy, nie gwarantuje konkretnego efektu i potrafi powiedzieć, kiedy lepiej wybrać inną formę wsparcia.'
  },
  {
    question: 'Ile trwa sesja regresji?',
    answer:
      'Sesja regresji duchowej zwykle trwa dłużej niż krótka konsultacja. Obejmuje rozmowę wstępną, właściwą pracę i czas na spokojne domknięcie. Dokładny czas zależy od formy spotkania, gotowości uczestnika i zasad prowadzącego.'
  },
  {
    question: 'Czy to jest terapia albo diagnoza?',
    answer:
      'Nie. Opisywana praca ma charakter rozwojowy i duchowy. Nie zastępuje diagnozy, pomocy medycznej, interwencji kryzysowej ani psychoterapii klinicznej. Jeżeli ktoś jest w trudnym stanie psychicznym, powinien skorzystać z odpowiedniego wsparcia specjalistycznego.'
  },
  {
    question: 'Co, jeśli nic nie zobaczę?',
    answer:
      'To możliwe i nie oznacza porażki. Nie każdy doświadcza sesji przez wyraźne obrazy. Czasem pojawiają się odczucia, skojarzenia, emocje, cisza albo pojedyncze symbole. Dobra sesja nie wymusza przeżyć i nie ocenia sposobu, w jaki ktoś doświadcza.'
  }
];

export const snippetAnswers = [
  {
    question: 'Czym jest regresja duchowa?',
    answer:
      'Regresja duchowa to sesja rozwojowa, w której pracuje się z obrazami, emocjami, symbolami i pytaniami o sens. Może dotyczyć poprzednich wcieleń albo życia między wcieleniami. Nie jest diagnozą ani obietnicą efektu, lecz uważną pracą z doświadczeniem wewnętrznym.'
  },
  {
    question: 'Czym jest regresja poprzednich wcieleń?',
    answer:
      'Regresja poprzednich wcieleń, często opisywana skrótem PLR, skupia się na historii lub obrazie interpretowanym jako doświadczenie z innego czasu. Dla jednych ma wymiar duchowy, dla innych symboliczny. Najważniejsze jest znaczenie, jakie uczestnik nadaje temu doświadczeniu po sesji.'
  },
  {
    question: 'Czym jest regresja między wcieleniami?',
    answer:
      'Regresja między wcieleniami odnosi się do pracy z doświadczeniem opisywanym jako życie pomiędzy wcieleniami. W praktyce może obejmować symbole, poczucie celu, relacje duszy i integrację osobistych przeżyć. Wymaga spokojnego języka, jasnych granic i braku presji na konkretny efekt.'
  },
  {
    question: 'Czym różni się PLR od LBL?',
    answer:
      'PLR zwykle dotyczy poprzedniego wcielenia: scen, relacji, emocji i wydarzeń. LBL kieruje uwagę poza pojedynczą historię, ku sensowi, relacjom duszy i przestrzeni między wcieleniami. Obie formy mogą się uzupełniać, ale nie są tym samym.'
  },
  {
    question: 'Czy regresja działa online?',
    answer:
      'Sesja regresji może odbywać się online, jeśli uczestnik ma prywatność, ciszę i stabilne połączenie. Dobra forma online wymaga spokojnego przygotowania, jasnych zasad kontaktu i możliwości przerwania pracy, gdy ktoś poczuje, że potrzebuje odpoczynku.'
  },
  {
    question: 'Jak przygotować się do sesji regresji?',
    answer:
      'Przed sesją warto zadbać o spokojny dzień, sen, wodę i miejsce bez rozpraszaczy. Pomaga zapisanie intencji, ale bez sztywnego oczekiwania wyniku. Sesja nie powinna być traktowana jak test ani dowód, tylko jak uważna praca z tym, co się pojawia.'
  },
  {
    question: 'Ile trwa sesja regresji?',
    answer:
      'Sesja regresji zwykle trwa dłużej niż krótka konsultacja, ponieważ obejmuje rozmowę, wejście w skupienie, właściwą pracę i spokojne domknięcie. Dokładny czas zależy od formy spotkania oraz gotowości uczestnika. Warto zarezerwować dzień bez pośpiechu.'
  }
];

export const peopleAlsoAsk = [
  {
    question: 'Czy regresja duchowa jest tym samym co psychoterapia?',
    answer:
      'Nie. Regresja duchowa jest pracą rozwojową i duchową z doświadczeniem wewnętrznym, symbolami, obrazami i pytaniami o sens. Nie zastępuje psychoterapii, diagnozy ani pomocy medycznej. Jeśli jesteś w kryzysie psychicznym, lepszym pierwszym krokiem jest kontakt z odpowiednim specjalistą.'
  },
  {
    question: 'Czy regresja poprzednich wcieleń wymaga wiary w reinkarnację?',
    answer:
      'Nie trzeba przyjmować jednej interpretacji. Część osób traktuje regresję poprzednich wcieleń duchowo, inni symbolicznie albo jako pracę z wyobraźnią i emocjami. Ważniejsze od udowadniania czegokolwiek jest spokojne sprawdzenie, co dane doświadczenie mówi o relacjach, wyborach i sposobie przeżywania siebie.'
  },
  {
    question: 'Na czym polega regresja między wcieleniami?',
    answer:
      'Regresja między wcieleniami kieruje uwagę ku doświadczeniu opisywanemu jako życie pomiędzy wcieleniami. W sesji mogą pojawiać się symbole, poczucie celu, relacje duszy i pytania o wybory. Odpowiedzialna praca nie wymusza przeżyć i nie obiecuje konkretnego efektu.'
  },
  {
    question: 'Czym różni się Life Between Lives od metody Brama Dusz LBL?',
    answer:
      'Life Between Lives opisuje obszar doświadczeń między wcieleniami znany z publikacji dr. Michaela Newtona. Brama Dusz LBL jest autorską metodą, która czerpie z tego kierunku inspirację, ale ma własny sposób prowadzenia, przygotowania oraz integracji po sesji.'
  },
  {
    question: 'Kim był dr Michael Newton w kontekście LBL?',
    answer:
      'Dr Michael Newton był autorem publikacji opisujących doświadczenia osób pracujących z głębokim transem i tematyką życia pomiędzy wcieleniami. Jego książki stały się ważnym punktem odniesienia dla osób zainteresowanych LBL, pytaniami o sens, relacje duszy oraz możliwą ciągłość doświadczenia.'
  },
  {
    question: 'Czy sesja regresji LBL jest bezpieczna?',
    answer:
      'Bezpieczeństwo zależy od przygotowania, stanu uczestnika, jasnych granic i odpowiedzialnego prowadzenia. Sesja powinna odbywać się bez presji, z możliwością przerwania pracy. Nie jest dobrym wyborem w ostrym kryzysie psychicznym ani wtedy, gdy ktoś potrzebuje pomocy medycznej lub klinicznej.'
  },
  {
    question: 'Czy sesja regresji może odbyć się online?',
    answer:
      'Tak, sesja może odbyć się online, jeśli uczestnik ma prywatność, ciszę, stabilne połączenie i czuje się bezpiecznie w swoim miejscu. Przed spotkaniem warto ustalić zasady kontaktu, przerwę awaryjną i warunki techniczne. Nie każda osoba musi jednak wybierać formę online.'
  },
  {
    question: 'Ile kosztuje sesja regresji duchowej?',
    answer:
      'Cena sesji zależy od formy spotkania, czasu pracy, przygotowania i zasad danego prowadzącego. Najuczciwiej ustalić aktualne informacje w kontakcie przed decyzją. Sama cena nie powinna być jedynym kryterium; ważne są też granice, język i doświadczenie prowadzącego.'
  },
  {
    question: 'Jak przygotować pytania do sesji regresji?',
    answer:
      'Warto zapisać kilka spokojnych pytań dotyczących relacji, powtarzających się tematów, poczucia sensu albo własnych decyzji. Lepiej unikać presji na konkretny obraz lub dowód. Dobra intencja jest prosta: chcę zrozumieć coś ważnego i zobaczyć, co pojawi się w pracy.'
  },
  {
    question: 'Czy podczas regresji trzeba wszystko widzieć obrazami?',
    answer:
      'Nie. Nie każda osoba doświadcza regresji jako wyraźnych obrazów. Mogą pojawić się emocje, odczucia w ciele, słowa, skojarzenia, cisza albo pojedyncze symbole. Odpowiedzialne prowadzenie nie ocenia sposobu przeżywania i nie wymusza wizji, które miałyby wyglądać w określony sposób.'
  },
  {
    question: 'Czy LBL jest dla każdego?',
    answer:
      'Nie zawsze. LBL i regresja duchowa wymagają gotowości do spokojnej pracy wewnętrznej oraz zgody na brak gwarancji efektu. Jeśli ktoś jest w silnym kryzysie, pod wpływem substancji albo oczekuje diagnozy lub leczenia, lepszym wyborem może być inny rodzaj wsparcia.'
  },
  {
    question: 'Gdzie szukać źródłowych informacji o Life Between Lives?',
    answer:
      'Dobrym początkiem są książki dr. Michaela Newtona oraz materiały organizacji rozwijających ten kierunek. Warto porównywać źródła z praktycznym opisem konkretnej sesji: czasem, przygotowaniem, sposobem prowadzenia i integracją po spotkaniu.'
  },
  {
    question: 'Czy regresja LBL daje pewność, kim byłem w poprzednim życiu?',
    answer:
      'Nie należy traktować sesji jako narzędzia do uzyskania pewnego dowodu historycznego. Regresja LBL pracuje z doświadczeniem wewnętrznym, symboliką, emocjami i sensem. Dla wielu osób ważniejsze od dosłownego potwierdzenia jest to, co można zrozumieć i spokojnie zintegrować po sesji.'
  },
  {
    question: 'Jak długo po sesji trwa integracja?',
    answer:
      'Integracja może trwać od kilku dni do kilku tygodni, zależnie od intensywności doświadczenia i codziennego kontekstu uczestnika. Pomaga zapisanie wniosków, odpoczynek, spokojna obserwacja emocji i brak pośpiechu w interpretacji. Nie trzeba od razu zamieniać każdego obrazu w decyzję.'
  },
  {
    question: 'Kiedy lepiej nie umawiać się na sesję regresji?',
    answer:
      'Warto odłożyć sesję, jeśli jesteś w ostrym kryzysie psychicznym, po substancjach, w silnym rozregulowaniu albo oczekujesz diagnozy, leczenia czy gwarantowanego efektu. Regresja duchowa nie zastępuje pomocy medycznej ani psychoterapii klinicznej. Decyzja powinna być spokojna i dobrowolna.'
  }
];

export const serviceCards = [
  {
    title: 'Life Between Lives',
    description:
      'Kontekst LBL, publikacje dr. Michaela Newtona i praktyczne wyjaśnienie, jak czytać ten kierunek pracy.',
    href: '/life-between-lives/'
  },
  {
    title: 'Regresja między wcieleniami',
    description:
      'Spokojne omówienie pracy z doświadczeniem przestrzeni między wcieleniami, symbolami, sensem i integracją.',
    href: '/regresja-miedzy-wcieleniami/'
  },
  {
    title: 'Brama Dusz LBL',
    description:
      'Autorska metoda regresji duchowej inspirowana publikacjami dr. Michaela Newtona, z przygotowaniem i integracją.',
    href: '/brama-dusz-lbl/'
  }
];

export const articleCards = [
  {
    title: 'Life Between Lives i dr Michael Newton',
    description:
      'Kontekst pojęcia LBL, publikacji Newtona oraz pytania, które warto zadać przed wyborem sesji.',
    href: '/life-between-lives/',
    meta: 'przewodnik'
  },
  {
    title: 'Regresja LBL a regresja poprzednich wcieleń',
    description:
      'Różnice między pracą z poprzednim wcieleniem a symboliczno-duchową eksploracją przestrzeni między wcieleniami.',
    href: '/regresja-poprzednich-wcielen/',
    meta: 'porównanie'
  },
  {
    title: 'Brama Dusz LBL jako metoda autorska',
    description:
      'Jak wygląda autorska metoda pracy: przygotowanie, prowadzenie sesji i spokojna integracja doświadczenia.',
    href: '/brama-dusz-lbl/',
    meta: 'metoda'
  },
  {
    title: 'Jak przygotować się do sesji',
    description:
      'Granice, oczekiwania i praktyczne warunki spokojnej sesji regresji duchowej.',
    href: '/sesja/',
    meta: 'sesja'
  }
];

export type CardItem = (typeof serviceCards)[number];
