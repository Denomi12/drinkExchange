# 07 – Pregled projekta

## Implementirane funkcionalnosti MVP

Implementiranih je vseh 7 funkcionalnosti MVP iz dokumenta [02 – Funkcionalnosti in obseg](02-funkcionalnosti-in-obseg.md):

1. **Javni borzni cenik**: gost vidi trenutno ceno, osnovno ceno in spremembo v zadnjih 5 minutah. Cenik se osveži vsaki 2 sekundi.
2. **Evidentiranje naročil**: natakar ustvari naročilo in mu doda pijače. Cena postavke se ob dodajanju zaklene.
3. **Zaključevanje in preklic naročil**: na ceno vplivajo samo zaključena naročila.
4. **Samodejni borzni izračun cen**: ob zaključku naročila se cena takoj zviša, brez prodaje pa se vsakih 5 sekund ohlaja. Cena ostane med min_price in max_price.
5. **Zgodovina in trend cen**: za vsako pijačo je na voljo graf cene v zadnji uri.
6. **Upravljanje ponudbe in cenovnih omejitev**: upravitelj dodaja, ureja, aktivira in deaktivira pijače.
7. **Prijava in dovoljenja po vlogah**: zaposleni se prijavijo, strežnik preverja vlogo, upravitelj upravlja račune natakarjev.

## Ujemanje z uporabniškimi zgodbami

### US-01 – Ogled javnega borznega cenika

Zgodba je izpolnjena. Za vsako aktivno pijačo so prikazani ime, kategorija, trenutna in osnovna cena ter sprememba v € in %. Rast je označena zeleno s puščico navzgor, padec rdeče s puščico navzdol. Neaktivne pijače niso prikazane. Cenik se samodejno osvežuje in deluje brez prijave.

### US-02 – Zgodovina in trend cene pijače

Zgodba je izpolnjena. Ob izbiri pijače se prikaže graf cen za zadnjo uro, prodaje so na njem označene s piko. Prodana količina se izpiše v oblačku, ko se z miško postaviš na piko.

### US-04 – Dovoljenja po vlogah

Zgodba je izpolnjena. Zaščitene poti brez veljavne seje vrnejo 401, poti brez ustrezne vloge pa 403. Natakar vidi in ureja samo svoja naročila, upravitelj vidi vsa. Zahteve, ki spreminjajo podatke, so zaščitene pred CSRF z žetonom, ki ga mora odjemalec poslati v glavi x-csrf-token. Frontend skrije strani, do katerih uporabnik nima dostopa, vendar dovoljenja vedno preveri tudi strežnik.

### US-05 – Ustvarjanje naročila in dodajanje postavk

Zgodba je izpolnjena. Natakar ustvari odprto naročilo. Ceno postavke določi strežnik iz trenutne cene pijače, ceno iz zahteve odjemalca pa prezre. Količina mora biti celo število, večje od 0, neaktivne pijače ni mogoče dodati.

### US-07 – Samodejni borzni izračun cen

Zgodba je izpolnjena. Ob zaključku naročila se cena takoj zviša. Opravilo vsakih 5 sekund ohlaja cene, nad osnovno ceno s polovičenjem odmika vsake 3 minute, pri ali pod njo vsakih 30 minut. Cena se zaokroži na 0,01 € in ostane v dovoljenih mejah. Vsaka sprememba se zapiše v PriceHistory.
