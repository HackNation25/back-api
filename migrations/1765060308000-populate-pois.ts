import { MigrationInterface, QueryRunner } from 'typeorm';

export class PopulatePois1765060308000 implements MigrationInterface {

  name = 'PopulatePois1765060308000';
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Insert POIs for "Bydgoszcz jako \"Klein Berlin\""
    await queryRunner.query(`
      INSERT INTO "poi" ("name", "shortDescription", "longDescription", "imageUrl", "popularity", "locationX", "locationY", "category_id")
      VALUES
      (
        'Pałacyk Lloyda',
        'Obiekt wzniesiony w stylu manieryzmu niderlandzkiego w latach 1885-1886 dla kapitana żeglugi Otto Liedtke.',
        'Obiekt wzniesiony w stylu manieryzmu niderlandzkiego w latach 1885-1886 dla kapitana żeglugi Otto Liedtke. Skromnych rozmiarów budowla kryje w swoich murach ponad 100 lat historii żeglugi śródlądowej w Bydgoszczy. Nieruchomość zakupiona na początku XX w. przez Bydgoskie Towarzystwo Zeglugi Sródlądowej (Bromberger Schleppschiffahrt) jest świadectwem roli, jaką w dziejach grodu nad Brdą odegrała wymiana handlowa rzeką. Związki Bydgoszczy z wodą, niezwykłe obiekty hydrotechniczne, ale takze XIX-wieczne przemysłowe dziedzictwo miasta, doskonale widać na Wyspie Młyńskiej.',
        'https://plum-defeated-urial-464.mypinata.cloud/ipfs/bafybeigwq7desdt7g6swkqiekfjz3crtqxqhk43cf2m3hfrie6efh4czhm/palacyk-lloyda.jpg',
        50,
        53.12256879845413,
        18.003111450971268,
        (SELECT "id" FROM "category" WHERE "name" = 'Bydgoszcz jako "Klein Berlin"')
      ),
      (
        'Kościół pw. św. Andrzeja Boboli',
        'Świątynia widoczna z Mostu Staromiejskiego została wzniesiona w latach 1901-1903 r. dia niemieckiej gminy wyznaniowej jako fara ewangelicka.',
        'Świątynia widoczna z Mostu Staromiejskiego została wzniesiona w latach 1901-1903 r. dia niemieckiej gminy wyznaniowej jako fara ewangelicka. Większość mieszkańców Bydgoszczy w tym czasie stanowili Niemcy, którzy byli w przeważającej części protestantami. Imponujący gmach kościoła, do dziś najwyższy budynek miasta (75 m wysokości), zaprojektował berliński architekt Heinrich Seeling. Choć specjalizował się on w budowie gmachów teatralnych, zrealizował dwa obiekty sakralne dla Bydgoszczy, jedyne świątynie w jego dorobku.',
        'https://plum-defeated-urial-464.mypinata.cloud/ipfs/bafybeigwq7desdt7g6swkqiekfjz3crtqxqhk43cf2m3hfrie6efh4czhm/boboli-church.jpg',
        50,
        53.121055373388806,
        18.004543507492347,
        (SELECT "id" FROM "category" WHERE "name" = 'Bydgoszcz jako "Klein Berlin"')
      ),
      (
        'Kamienica przy ul. Stary Port 1-3',
        'Neobarokowy narożny gmach wzniesiony przez jednego z najbardziej znanych bydgoskich budowiezych, Józefa Święcickiego.',
        'Neobarokowy narożny gmach wzniesiony przez jednego z najbardziej znanych bydgoskich budowiezych, Józefa Święcickiego, został zaprojektowanyjako dom Honenzollern: interesujaca ozdobą tego budynku była rzeźba cesarza Wilhelma I, Umieszczona w niszy znajdującej się w narożniku na wysokosel trzeciego piętra. Król Prus, który został pierwszym władcą zjednoczonych Niemiec, spoglądał na Brdę od 1893 r. do momentu powrotu Bydgoszczy do Polski w 1920 г.',
        'https://plum-defeated-urial-464.mypinata.cloud/ipfs/bafybeigwq7desdt7g6swkqiekfjz3crtqxqhk43cf2m3hfrie6efh4czhm/Bydgoszcz_Stary_Port_1-3.jpg',
        50,
        53.12358949914671,
        18.002019242352315,
        (SELECT "id" FROM "category" WHERE "name" = 'Bydgoszcz jako "Klein Berlin"')
      )
    `);

    // Insert POIs for "Dookoła Śródmieścia"
    await queryRunner.query(`
      INSERT INTO "poi" ("name", "shortDescription", "longDescription", "imageUrl", "popularity", "locationX", "locationY", "category_id")
      VALUES
      (
        'Klaryski',
        'Wybierając się w trasę po Sródmiesciu, warto rozpocząć ją od Kościoła pw. Wniebowzięcia Najswiętszej Maryi Panny.',
        'Wybierając się w trasę po Sródmiesciu, warto rozpocząć ją od Kościoła pw. Wniebowzięcia Najswiętszej Maryi Panny (potocznie zwany kościołem Klarysek), w którym kiedyś mieścił się klasztor sióstr klarysek, prowadzących szpitalny przytułek. Do wnętrza kościoła prowadzi neorenesansowy portal (1925, projekt: Stefan Cybichowski). Z wieży zegarowej codziennie o godzinie 12:00, 15:00 oraz 18:00 jest odgrywany hejnał miasta, który został skomponowany z okazji 600-lecia nadania praw miejskich Bydgoszczy.',
        'https://plum-defeated-urial-464.mypinata.cloud/ipfs/bafybeigwq7desdt7g6swkqiekfjz3crtqxqhk43cf2m3hfrie6efh4czhm/Bydgoszcz_koscio%CC%81%C5%82_Klarysek_lato.jpg',
        50,
        53.12432847101335,
        18.002915681154207,
        (SELECT "id" FROM "category" WHERE "name" = 'Dookoła Śródmieścia')
      ),
      (
        'Gdańska 5',
        'Budynek przebudowany przez Rudolfa Kerna, który wprowadził dekorację przywołującą formy berlińskiej secesji z fryzem zdobionym stylizowanymi łabędziami.',
        'Budynek przebudowany przez Rudolfa Kerna, który wprowadził dekorację przywołującą formy berlińskiej secesji z fryzem zdobionym stylizowanymi łabędziami. Do niedawna funkcjonowała tu, czynna nieprzerwanie od 1853 roku, "Apteka pod łabędziem", która przekształcona została w jeden z oddziałów Muzeum Okręgowego. W kamienicy mieści się również Bydgoskie Centrum Organizacji Pozarządowych i Wolontariatu.',
        'https://plum-defeated-urial-464.mypinata.cloud/ipfs/bafybeigwq7desdt7g6swkqiekfjz3crtqxqhk43cf2m3hfrie6efh4czhm/Gdanska_5.jpg',
        50,
        53.124955238014344,
        18.002743054570228,
        (SELECT "id" FROM "category" WHERE "name" = 'Dookoła Śródmieścia')
      ),
      (
        'Hotel Pod Orłem',
        'Wybudowany w latach 1892-1894 - budynek o neobarokowych formach nadanych mu przez J. Święcickiego.',
        'Wybudowany w latach 1892-1894 - budynek o neobarokowych formach nadanych mu przez J. Święcickiego. Gdy zajrzymy do wnętrza, zobaczymy pełen przepychu hol ze sztukateriami, witrażami i złoconymi kutymi balustradami. W 1921 roku w tym hotelu zatrzymał się na kilkugodzinny odpoczynek Józef Pilsudski.',
        'https://plum-defeated-urial-464.mypinata.cloud/ipfs/bafybeigwq7desdt7g6swkqiekfjz3crtqxqhk43cf2m3hfrie6efh4czhm/Bdg_hotel_Pod_Orlem.jpg',
        50,
        53.12583896286518,
        18.003812281437547,
        (SELECT "id" FROM "category" WHERE "name" = 'Dookoła Śródmieścia')
      )
    `);

    // Insert POIs for "Poznaj Stare Miasto"
    await queryRunner.query(`
      INSERT INTO "poi" ("name", "shortDescription", "longDescription", "imageUrl", "popularity", "locationX", "locationY", "category_id")
      VALUES
      (
        'Stary Rynek',
        'Centralny plac miasta zostat wytyczony w 1346 r.',
        'Centralny plac miasta zostat wytyczony w 1346 r. w momencie lokacji miasta przez króla Kazimierza Wielkiego, a jego obecna zabudowa pochodzi głównie z XIX w. Podczas rewitalizacji w 2019 roku oznaczono na płycie rynku m.in. przebieg 18. południka, zarys dawnego ratusza oraz ustawiono zegar z czasem bydgoskim.',
        'https://plum-defeated-urial-464.mypinata.cloud/ipfs/bafybeigwq7desdt7g6swkqiekfjz3crtqxqhk43cf2m3hfrie6efh4czhm/stary-rynek.jpg',
        50,
        53.122165922813224,
        18.000700257215488,
        (SELECT "id" FROM "category" WHERE "name" = 'Poznaj Stare Miasto')
      ),
      (
        'Ratusz',
        'Bydgoski Ratusz mieści się w okazałym gmachu dawnego kolegium jezuickiego z XVII w.',
        'Bydgoski Ratusz mieści się w okazałym gmachu dawnego kolegium jezuickiego z XVII w.',
        'https://plum-defeated-urial-464.mypinata.cloud/ipfs/bafybeigwq7desdt7g6swkqiekfjz3crtqxqhk43cf2m3hfrie6efh4czhm/Ratusz_w_Bydgoszczy.jpg',
        50,
        53.122273515506194,
        17.99901836231405,
        (SELECT "id" FROM "category" WHERE "name" = 'Poznaj Stare Miasto')
      ),
      (
        'Katedra pw. św. Marcina i Mikołaja',
        'Katedra pw. św. Marcina i Mikołaja to najstarszy kościół w Bydgoszczy.',
        'Katedra pw. św. Marcina i Mikołaja to najstarszy kościół w Bydgoszczy. Budowa trwała od 1466 do 1502 roku. Do wnętrza wchodzimy przez 500 kg spiżowe drzwi w przyziemiu wieży kościoła.',
        'https://plum-defeated-urial-464.mypinata.cloud/ipfs/bafybeigwq7desdt7g6swkqiekfjz3crtqxqhk43cf2m3hfrie6efh4czhm/Kosciol-marcina-i-mikolaja.jpg',
        50,
        53.122882652167036,
        17.999122149666082,
        (SELECT "id" FROM "category" WHERE "name" = 'Poznaj Stare Miasto')
      )
    `);

    // Insert POIs for "Bydgoskie Murale"
    await queryRunner.query(`
      INSERT INTO "poi" ("name", "shortDescription", "longDescription", "imageUrl", "popularity", "locationX", "locationY", "category_id")
      VALUES
      (
        'Ptasiek',
        'ul. 3 maja 14',
        'organizator: Ośrodek Działań Kulturowych LAS, 2008',
        'https://plum-defeated-urial-464.mypinata.cloud/ipfs/bafybeigwq7desdt7g6swkqiekfjz3crtqxqhk43cf2m3hfrie6efh4czhm/ptasiek.jpg',
        50,
        53.12556753483806,
        18.009231230263932,
        (SELECT "id" FROM "category" WHERE "name" = 'Bydgoskie Murale')
      ),
      (
        'Panienka z okienka',
        'ul. Toruńska 49',
        'autor: Adam Kłodziński, Sebastian Tkaczyk Bite-Art Festival, 2017',
        'https://plum-defeated-urial-464.mypinata.cloud/ipfs/bafybeigwq7desdt7g6swkqiekfjz3crtqxqhk43cf2m3hfrie6efh4czhm/panienka-z-okienka.jpg',
        50,
        53.119142712032804,
        18.019685480295433,
        (SELECT "id" FROM "category" WHERE "name" = 'Bydgoskie Murale')
      ),
      (
        'Mural Fantazja',
        'ul. Bulwary',
        'autorzy: Marek Woźniak i Tomasz Pobiedziński | Festiwal Pozytywka 2023',
        'https://plum-defeated-urial-464.mypinata.cloud/ipfs/bafybeigwq7desdt7g6swkqiekfjz3crtqxqhk43cf2m3hfrie6efh4czhm/mural-fantazja.jpg',
        50,
        53.126809226167644,
        17.996499913187275,
        (SELECT "id" FROM "category" WHERE "name" = 'Bydgoskie Murale')
      )
    `);

    // Insert POIs for "Bydgoszcz Turystycznie"
    await queryRunner.query(`
      INSERT INTO "poi" ("name", "shortDescription", "longDescription", "imageUrl", "popularity", "locationX", "locationY", "category_id")
      VALUES
      (
        'Rowery wodne',
        'Atrakcja turystyczna oferująca możliwość zwiedzania Bydgoszczy z perspektywy wody.',
        'Rowery wodne to popularna atrakcja turystyczna w Bydgoszczy, umożliwiająca zwiedzanie miasta z perspektywy rzeki Brdy. To unikalny sposób na poznanie Bydgoszczy, pozwalający zobaczyć miasto z innej strony. Wypożyczalnia rowerów wodnych oferuje możliwość aktywnego spędzenia czasu na wodzie.',
        'https://plum-defeated-urial-464.mypinata.cloud/ipfs/bafybeigwq7desdt7g6swkqiekfjz3crtqxqhk43cf2m3hfrie6efh4czhm/rowery-wodne.jpg',
        50,
        53.12334850287512,
        17.994842318816158,
        (SELECT "id" FROM "category" WHERE "name" = 'Bydgoszcz Turystycznie')
      ),
      (
        'Manufaktura Słodyczy',
        'Miejsce, gdzie można zobaczyć proces produkcji słodyczy i spróbować lokalnych wyrobów.',
        'Manufaktura Słodyczy to atrakcja turystyczna, gdzie można zobaczyć tradycyjny proces produkcji słodyczy. Miejsce oferuje możliwość obserwacji pracy cukierników oraz degustacji świeżo wyprodukowanych wyrobów. To doskonała atrakcja dla rodzin z dziećmi oraz miłośników słodyczy.',
        'https://plum-defeated-urial-464.mypinata.cloud/ipfs/bafybeigwq7desdt7g6swkqiekfjz3crtqxqhk43cf2m3hfrie6efh4czhm/manufaktura-slodyczy.jpg',
        50,
        53.121212059176344,
        17.999211721416923,
        (SELECT "id" FROM "category" WHERE "name" = 'Bydgoszcz Turystycznie')
      ),
      (
        'Wyspa Młyńska',
        'Zabytkowa wyspa na Brdzie, ważne miejsce rekreacyjne i kulturalne w centrum Bydgoszczy.',
        'Wyspa Młyńska to zabytkowa wyspa na rzece Brdzie, stanowiąca ważne miejsce rekreacyjne i kulturalne w centrum Bydgoszczy. Wyspa jest połączona z lądem mostami i oferuje przestrzeń do spacerów oraz odpoczynku. Na wyspie znajdują się zabytkowe budynki oraz miejsca wydarzeń kulturalnych.',
        'https://plum-defeated-urial-464.mypinata.cloud/ipfs/bafybeigwq7desdt7g6swkqiekfjz3crtqxqhk43cf2m3hfrie6efh4czhm/wyspa-mlynska.jpg',
        50,
        53.12274940572049,
        17.99582045489358,
        (SELECT "id" FROM "category" WHERE "name" = 'Bydgoszcz Turystycznie')
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "poi" 
      WHERE "name" IN (
        'Pałacyk Lloyda',
        'Kościół pw. św. Andrzeja Boboli',
        'Kamienica przy ul. Stary Port 1-3',
        'Klaryski',
        'Gdańska 5',
        'Hotel Pod Orłem',
        'Stary Rynek',
        'Ratusz',
        'Katedra pw. św. Marcina i Mikołaja',
        'Ptasiek',
        'Panienka z okienka',
        'Mural Fantazja',
        'Rowery wodne',
        'Manufaktura Słodyczy',
        'Wyspa Młyńska'
      )
    `);
  }
}

