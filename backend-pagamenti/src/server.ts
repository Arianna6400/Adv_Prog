/*
  Gestisce l’avvio del server e la connessione al database
 */

  import app from './app'; // Importa l'applicazione Express
  import { initModels } from './models'; // Importa la funzione per sincronizzare i modelli con il database
  
  const PORT = process.env.PAGAMENTIT_PORT || 3001; // Definisce la porta su cui ascolterà il server
  
  // Funzione per avviare il server
  const startServer = async () => {
    try {
      // Sincronizza i modelli con il database
      await initModels();
      console.log('Database sincronizzato con successo.');
  
      // Avvia il server e ascolta le richieste sulla porta definita
      app.listen(PORT, () => {
        console.log(`Server in esecuzione sulla porta ${PORT}`);
      });
    } catch (error) {
      console.error('Impossibile connettersi al database:', error);
    }
  };
  
  startServer(); // Esegue la funzione per avviare il server