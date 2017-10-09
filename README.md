# NodeJS Chat [live](https://talk.kucharskov.pl/)

## Zmiany w wersji 2.0
* ***[OPTYMALIZACJA]*** Refraktoryzacja kodu (poukładanie folderów i plików)
* ***[FEATURE]*** Panel administracyjny z kodowaniem SHA-512 i opcją kicka bądź upomnienia od administratora.
* ***[FEATURE]*** IPGuard do blokady dużej ilości klientów per IP
* ***[FEATURE]*** Antyspam * ***do blokowania powtarzających się wiadomości oraz szybko wysyłanych wiadomości
* ***[FEATURE]*** Powiadomienie o nieprzeczytanych wiadomościach w tagu TITLE
* ***[FEATURE]*** Lista zalogowanych osób w bocznej liście
* ***[FEATURE]*** Zaprzęgnięcie webpacka do pracy i minimalizowanie kodu klienta podczas budowy z modułów.
* ***[FEATURE]*** Po kliknięciu nazwy usera na czacie dodaje do wiadomości @nazwausera
* ***[FEATURE]*** Dodanie zakładki "Ustawienia" z opcją wyłaczenia animacji czy powiadomień w TITLE
* ***[FEATURE]*** Opcja włączenia powiadomienia dźwiękowego
* ***[FIX]*** Parsowanie danych od użytkownika na string * ***zabezpieczenie przed wywalenie serwera
* ***[FIX]*** Wysyłanie wiadomości emitem bez logowania.
* ***[FIX]*** Żegnanie jedynie zalogowanych userów
* ***[FIX]*** Zerowanie countera znaków przed zalogowaniem
* ***[FIX]*** Włączenie walidacji wiadomości po stronie serwera
* ***[FIX]*** Przeniesienie funkcjonalności tworzenia wiadomości na usera, przez co naprawiony został błąd z psuedonimami z apostrofem