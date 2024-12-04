export default interface IDog {
    Name: string
    race: string
    DogPicture: string
    DogBirthDate: string
    }

export default interface IUiser {
    id: number
userName: string
firstName: string
lastName: string
email: string
password: string
ProfilePicture:string
BirthDate: Date

    }

export default interface IEvent {
    id: number
    title: string
    creatorId: number
    description: string
    date: number
    location: number
    price: number
    photo: File // base64

    }
    

 

