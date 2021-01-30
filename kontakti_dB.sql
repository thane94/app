CREATE DATABASE Kontakti;
USE Kontakti;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_passowrd BY 'root';
FLUSH PRIVILEGES; 
CREATE TABLE Korisnik (
	IDkorisnik				INT	AUTO_INCREMENT	PRIMARY KEY,
    Ime						NVARCHAR(255)	NOT NULL,
    Prezime					NVARCHAR(255)	NOT NULL,
    Adresa					NVARCHAR(255),
    DatumPrvogUnosa			DATE			NOT NULL
);

SELECT*FROM Korisnik;

CREATE TABLE BrojTelefona (
	IDbroj					INT AUTO_INCREMENT	PRIMARY KEY	NOT NULL,
    Broj					VARCHAR(255),
    korisnikID				INT,
    CONSTRAINT fk_korisnikID
					FOREIGN KEY (korisnikID) REFERENCES Korisnik(IDkorisnik) 
);

ALTER TABLE BrojTelefona
	ADD	VrstaID		INT,
	ADD	 CONSTRAINT	fk_vrstaBroja
					FOREIGN KEY	(VrstaID)	REFERENCES	VrstaBroja	(IDvrste);

CREATE TABLE VrstaBroja (
    IDvrste				INT AUTO_INCREMENT		PRIMARY KEY,
    Naziv				NVARCHAR(255)			NOT NULL
);	

INSERT INTO Korisnik (IDkorisnik, Ime, Prezime, Adresa, DatumPrvogUnosa)
	VALUES	(1,'Ivo', 'Ivić', 'Gradiščanska 18', '2020-01-10'),
			(2, 'Marija', 'Marijanić', 'Zadarska 15', '2020-02-12'),
            (3,'Zrinka', 'Zrinić', 'Zagrebačka 23', '2020-03-04'),
            (4,'Veljko', 'Veljić', 'Istarska 42', '2020-04-05'),
            (5, 'Marijan', 'Marić', 'Unska 16','2020-05-05');
            
SELECT*FROM Korisnik;
SELECT*FROM BrojTelefona;

INSERT INTO VrstaBroja (IDVrste, Naziv)
	VALUES	(1, 'Kućni'),
			(2, 'Poslovni'),
            (3,	'Mobilni');
SELECT*FROM VrstaBroja;

INSERT INTO BrojTelefona (Broj, korisnikID, VrstaID)
			VALUES  ('0919212999', 2, 3),
					('0922233145', 2, 2),
                    ('01/6223223', 1, 1),
                    ('0915212109', 1, 3),
                    ('0985288231', 3, 3),
                    ('01/6222222', 4, 1),
                    ('01/6685647', 5, 1),
                    ('0939999221', 5, 2),
                    ('0995088455', 5, 3);

#Skužio sam da nisam stavio da svaki broj telefona mora biti jedinstven, tj. UNIQUE
DELETE FROM BrojTelefona
WHERE Broj='0919212999'
ORDER BY korisnikID
LIMIT 1;

ALTER TABLE BrojTelefona
	ADD UNIQUE (Broj);

# Prikazati sve brojeve koje se odnose na nekog korisnika po izboru (dodao sam još i vrstu u upit)
SELECT DISTINCT Ime AS 'Ime', Prezime AS 'Prezime', Broj AS 'Broj Telefona', Naziv AS 'Vrsta'
FROM Korisnik
INNER JOIN BrojTelefona korisnikID ON Korisnik.IDkorisnik = korisnikID
INNER JOIN VrstaBroja IDvrste ON VrstaID = IDvrste
WHERE IDkorisnik = 5;

#Prikazati ukupan broj kontakata
SELECT COUNT(*) FROM Korisnik;

#Prikazati broj brojeva za svakog korisnika
SELECT DISTINCT Ime AS 'Ime', Prezime AS 'Prezime', Broj AS 'Broj'
FROM Korisnik
INNER JOIN BrojTelefona korisnikID ON Korisnik.IDkorisnik=korisnikID;

#Prikazati kontakt koji je poslijednji unesen u bazu
SELECT * FROM Korisnik ORDER BY IDKorisnik DESC LIMIT 1


########################## OBRAZLOŽENJA  #############################

# upite za stvaranje i popunjavanje tablica (to je gore :D)
# obrazloženje zašto si odabrao određen tip podatka u tablici. osim odabranog tipa podatka, možeš kratko prokomentirati i koje si druge tipove podataka razmatrao (ako si). 

	#NVARCHAR glavni razlog radi radi UNICODE data (Ime, Prezime, Adresa, Naziv vrste broja telefona)
    #VARCHAR za broj jer uglavnom se neće nikakve operacije izvršavati nad brojevima telefona, u suprotnome, stavio bih ga u INT 
    #AUTO INCREMENT jer setira inicijalnu vrijednost i ne mora se navoditi prilikom insertiranja u tablicu (u dva segmenta zadatka sam ga naveo u jednom nisam)
    #CONSTRAINT osigurava pouzdanost podataka prilikom povezivanja tablica (FOREIGN KEY) CONSTRAINT sprečava uništavanje linkova između tablica
		#(pouzadnost podataka)