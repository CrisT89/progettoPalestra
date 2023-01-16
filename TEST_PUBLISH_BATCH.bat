@echo off
title Eqp-PublishCommands - TEST PROFILE

REM Definisco le variabili usate nel processo:
REM 	- CurrProjName: nome della solution, usato per la navigazione nelle cartelle e per creare la build dei progetti dotnet;
set CurrProjName=progettoPalestra

echo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
echo %date%_%time%: INIZIO PROCESSO...
echo Questa e' il nome della cartella che contiene le build: BUILDS
echo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

if %CurrProjName%==@@PRJNAME (
	echo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	echo %date%_%time%: ERRORE: Per procedere alla pubblicazione specificare il nome del progetto.
	echo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	pause
	exit
)

REM Creo le cartelle in cui copiare/creare le build dei vari progetti.
echo %date%_%time%: Creazione cartelle.

if not exist BUILDS mkdir BUILDS

if exist BUILDS\TEST_BUILD rmdir /s /q BUILDS\TEST_BUILD

echo %date%_%time%: Cartelle create.



REM Lancio la pubblicazione del progetto Web con il profilo TEST
REM Una volta concluso il processo mi sposto nella cartella dei log della build appena creata, 
REM elimino i file esistenti per alleggerire la cartella e torno alla root della solution.
echo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
echo %date%_%time%: Inizio la pubblicazione progetto del Web con profilo di TEST.
echo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
dotnet publish %CurrProjName%.Web/%CurrProjName%.Web.csproj -c Release -p:PublishProfile=%CurrProjName%.Web\Properties\PublishProfiles\TestProfile.pubxml --output BUILDS\TEST_BUILD\SERVER && (
	echo %date%_%time%: Pubblicazione progetto Web completata.
) || (
	echo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	echo %date%_%time%: ERRORE DURANTE LA PUBBLICAZIONE DEL PROGETTO %CurrProjName%.Web 
	echo                CON IL PROFILO DI TEST.
	echo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	pause
	exit
)
if exist BUILDS\TEST_BUILD\SERVER\logs cd BUILDS\TEST_BUILD\SERVER\logs & del * /s /q & cd ..\..\..\..\



REM Mi sposto nella cartella dell'app client per eseguire le build.
cd %CurrProjName%.Web/%CurrProjName%Client

echo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
echo %date%_%time%: Inizio la build client per l'ambiente di TEST.
echo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
call npm run build-test-bat && (
	echo %date%_%time%: Build client completata.
) || (
	echo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	echo %date%_%time%: ERRORE DURANTE LA PUBBLICAZIONE DEL PROGETTO CLIENT PER L'AMBIENTE DI TEST.
	echo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	pause
	exit
)



REM Torno alla root della solution e lancio il comando della powershell per comprire le build in un unico archivio zip.
cd ../../BUILDS
if exist  TEST_BUILD.zip del /f TEST_BUILD.zip
echo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
echo %date%_%time%: Inizio la compressione delle cartelle.
echo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
call powershell Compress-Archive -LiteralPath TEST_BUILD -DestinationPath TEST_BUILD.zip && (
	echo %date%_%time%: Compressione completata.
) || (
	echo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	echo %date%_%time%: ERRORE DURANTE LA COMPRESSIONE DELLE CARTELLE.
	echo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	pause
	exit
)



echo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
echo %date%_%time%: PROCESSO COMPLETATO.
echo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

pause
