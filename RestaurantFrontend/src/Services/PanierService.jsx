const API_URL = 'http://localhost:8080/api/panier';

const PanierService = {

    // Récupère le panier d'un client spécifique.
    getPanier: async (clientId) => {
        const response = await fetch(`${API_URL}/afficher/${clientId}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération du panier');
        }
        return response.json();
    },

    // Ajoute un élément au panier.
    ajouterAuPanier: async (panier) => {
        const response = await fetch(`http://localhost:8080/api/panier/ajouter`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(panier)
        });
        if (!response.ok) {
            throw new Error('Erreur lors de l\'ajout au panier');
        }
        return response.json();
    },

    // Supprime un élément spécifique du panier.
    supprimerDuPanier: async (panierId) => {
        const response = await fetch(`${API_URL}/supprimer/${panierId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Erreur lors de la suppression de l\'élément du panier');
        }
    },

    // Vide complètement le panier d'un client donné.
    viderPanier: async (clientId) => {
        const response = await fetch(`${API_URL}/vider/${clientId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Erreur lors de la suppression du panier');
        }
    }
};

export default PanierService;
