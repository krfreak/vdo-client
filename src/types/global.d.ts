export {}

declare global {

    interface ActivationOptions {
        races: Race[]
        heroes: Hero[]
        nations: Nation[]
    }
    
    interface Hero {
        id: number
        name: string
        imageUri: string | null
        race: Race
        attackBonus: number
        defenseBonus: number
        healthBonus: number
        speedBonus: number
    }

    interface Nation {
        id: number
        number: number,
        name: string
    }

    interface Player {
        id: number
        name: string
    }

    interface Race {
        id: number
        name: string
        description: string
        imageUri: string | null
    }
    
    interface Round {
        id: number
        createdAt: string
        startedAt: string | null
        finishedAt: string | null
        active: boolean
    }
}