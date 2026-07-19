export const siteData = {
  name: 'Regresja LBL',
  domain: 'https://regresjalbl.pl',
  url: 'https://regresjalbl.pl',
  defaultImage: '/images/regresja-lbl-brama.webp',
  ogImage: '/images/regresja-lbl-brama.webp',
  language: 'pl-PL',
  cta: {
    label: 'Zapytaj o sesję LBL',
    url: '/sesja/#kontakt',
    href: '/sesja/#kontakt'
  },
  instituteLink: {
    label: 'Instytut Regresji',
    url: 'https://instytutregresji.pl/',
    lblUrl: 'https://instytutregresji.pl/regresja-lbl.html'
  },
  session: {
    duration: '2,5–3,5 godziny',
    format: 'online lub stacjonarnie w Rzeszowie',
    price: 'od 1110 zł'
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
      'Maciej Masłanka prowadzi sesje regresji LBL, regresji poprzednich wcieleń i regresji duchowej. Studiuje psychologię w Warszawie, ukończył szkolenia z regresji oraz hipnozy regresyjnej i rozwija własny format pracy Brama Dusz LBL.'
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
    { href: '/sesja/', label: 'Sesja LBL' },
    { href: '/life-between-lives/', label: 'Life Between Lives' },
    { href: '/regresja-miedzy-wcieleniami/', label: 'Między wcieleniami' },
    { href: '/o-macieju/', label: 'Prowadzący' },
    { href: '/artykuly/', label: 'Baza wiedzy' },
    { href: '/faq/', label: 'FAQ' },
    { href: '/brama-dusz-lbl/', label: 'Brama Dusz LBL' }
  ],
  footerLinks: [
    { href: '/', label: 'Regresja LBL' },
    { href: '/life-between-lives/', label: 'Life Between Lives i Michael Newton' },
    { href: '/regresja-poprzednich-wcielen/', label: 'Regresja poprzednich wcieleń' },
    { href: '/regresja-miedzy-wcieleniami/', label: 'Regresja między wcieleniami' },
    { href: '/brama-dusz-lbl/', label: 'Brama Dusz LBL' },
    { href: '/o-macieju/', label: 'Polecany prowadzący' },
    { href: '/sesja/', label: 'Sesja regresji LBL' },
    { href: '/faq/', label: 'FAQ' }
  ],
};

export interface FaqItem {
  question: string;
  answer: string;
}

export const homeFaq: FaqItem[] = [
  {
    question: 'Czym jest regresja LBL?',
    answer:
      'Regresja LBL, czyli Life Between Lives, jest pogłębioną sesją poświęconą doświadczeniu życia między wcieleniami. Praca może obejmować poprzednie wcielenie, przejście poza jego zakończenie, relacje duszy, poczucie celu i pytania przygotowane przed spotkaniem. W Instytucie Regresji sesja obejmuje przygotowanie, właściwą pracę oraz spokojne omówienie doświadczenia.'
  },
  {
    question: 'Czy LBL jest tym samym co PLR?',
    answer:
      'Nie. PLR zwykle oznacza regresję poprzednich wcieleń, czyli pracę z obrazem konkretnej historii, relacji lub doświadczenia. LBL prowadzi dalej, ku przestrzeni między wcieleniami, relacjom duszy, wyborom i szerszej perspektywie duchowej. W pełnej sesji LBL poprzednie wcielenie może być jednym z etapów drogi.'
  },
  {
    question: 'Czy muszę wierzyć w poprzednie wcielenia?',
    answer:
      'Nie. Możesz traktować pojawiające się obrazy duchowo, symbolicznie, intuicyjnie albo jako materiał do refleksji. Nie trzeba przyjmować jednej interpretacji przed spotkaniem. Podczas sesji pracujesz z tym, co rzeczywiście się pojawia, a po niej samodzielnie oceniasz znaczenie doświadczenia dla obecnego życia.'
  },
  {
    question: 'Czy sesja może odbyć się online?',
    answer:
      'Tak. Sesje regresji LBL są dostępne online oraz stacjonarnie w Rzeszowie. Przy spotkaniu online potrzebne są prywatność, stabilne połączenie, wygodne miejsce i kilka godzin bez przerw. Przed terminem prowadzący omawia warunki techniczne oraz sposób przygotowania, aby w dniu sesji można było skupić się na samej pracy.'
  },
  {
    question: 'Na co zwrócić uwagę przy wyborze prowadzącego?',
    answer:
      'Sprawdź doświadczenie, ukończone szkolenia, sposób przygotowania, czas sesji i to, czy możesz swobodnie zadawać pytania. Dobry prowadzący jasno opisuje przebieg pracy, nie gwarantuje konkretnego efektu i potrafi powiedzieć, kiedy lepiej wybrać inną formę wsparcia. Ważne są również zasady kontaktu oraz integracji po spotkaniu.'
  },
  {
    question: 'Ile trwa sesja regresji?',
    answer:
      'Standardowa sesja regresji LBL trwa zwykle od 2,5 do 3,5 godziny. Ten czas obejmuje krótkie przygotowanie, prowadzenie przez właściwe doświadczenie oraz spokojny powrót i pierwsze omówienie. Warto zostawić sobie również wolniejszą część dnia po spotkaniu, bez ważnych obowiązków i pośpiechu.'
  },
  {
    question: 'Czy to jest terapia albo diagnoza?',
    answer:
      'Nie. Opisywana praca ma charakter rozwojowy i duchowy. Nie służy diagnozowaniu chorób i nie zastępuje pomocy medycznej, interwencji kryzysowej ani psychoterapii klinicznej. Jeżeli ktoś jest w ostrym kryzysie lub potrzebuje leczenia, właściwym pierwszym krokiem jest kontakt z odpowiednim specjalistą, a nie sesja regresji.'
  },
  {
    question: 'Co, jeśli nic nie zobaczę?',
    answer:
      'To możliwe i nie oznacza porażki. Nie każdy doświadcza sesji przez wyraźne obrazy. Czasem pojawiają się odczucia, skojarzenia, emocje, słowa, cisza albo pojedyncze symbole. Prowadzący może pracować z każdym z tych sposobów odbioru. Sesja nie powinna wymuszać wizji ani oceniać intensywności doświadczenia.'
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
      'Sesja regresji LBL trwa zwykle od 2,5 do 3,5 godziny. Obejmuje przygotowanie, wejście w stan skupienia, właściwą pracę i spokojne domknięcie. Warto zarezerwować sobie również czas po spotkaniu, aby bez pośpiechu zapisać wrażenia i odpocząć.'
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
      'Cena sesji regresji LBL w Instytucie Regresji zaczyna się od 1110 zł. Ostateczny wariant zależy od wybranej formy i zakresu spotkania, dlatego aktualną kwotę oraz dostępność terminu najlepiej potwierdzić przed rezerwacją. W pierwszej wiadomości możesz od razu zapytać o koszt, formę online lub spotkanie w Rzeszowie.'
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
    title: 'Sesja regresji LBL',
    description:
      'Przebieg, czas, przygotowanie, spotkanie online lub w Rzeszowie oraz bezpośredni kontakt w sprawie terminu.',
    href: '/sesja/'
  },
  {
    title: 'Life Between Lives',
    description:
      'Znaczenie LBL, publikacje dr. Michaela Newtona i praktyczne wyjaśnienie pracy z życiem między wcieleniami.',
    href: '/life-between-lives/'
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
    title: 'Brama Dusz LBL — osobny format pracy',
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
