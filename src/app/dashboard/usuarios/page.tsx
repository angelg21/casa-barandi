import { FilteredUserTable } from "@/src/users/components/FilteredUserTable/FilteredUserTable";
import { AlertProvider } from "@/src/users/contex/AlertContext";



const data = [
    {
        _id: "66c3efae0fc7698e7690cfb5",
        fullName: "Ángel Guevara",
        email: "guevarangel14@gmail.com",
        roles: ["researcher"],
        imageUrl: "https://lh3.googleusercontent.com/a/AC8ocIdHeFwPnlufE7PPTAHgcySyXveJ..."
    },
    {
        _id: "66c3efae0fc7698e7690cfb6",
        fullName: "Maria Perez",
        email: "maria.perez@gmail.com",
        roles: ["admin"],
        imageUrl: "https://lh3.googleusercontent.com/a/AC8ocIdHeFwPnluZE7APTQHgcySy123J..."
    },
    {
        _id: "66c3efae0fc7698e7690cfb7",
        fullName: "Luis Fernández",
        email: "luis.fernandez@gmail.com",
        roles: ["researcher"],
        imageUrl: "https://lh3.googleusercontent.com/a/AC8ocIdHeFwPnluZE7APTRGhyqSDc78J..."
    },
    {
        _id: "66c3efae0fc7698e7690cfb8",
        fullName: "Carla López",
        email: "carla.lopez@gmail.com",
        roles: ["admin", "researcher"],
        imageUrl: "https://lh3.googleusercontent.com/a/AC8ocIdHeFwPnluZE7APTQJgyBc7asfJ..."
    },
    {
        _id: "66c3efae0fc7698e7690cfb9",
        fullName: "Jorge Ramírez",
        email: "jorge.ramirez@gmail.com",
        roles: ["editor"],
        imageUrl: "https://lh3.googleusercontent.com/a/AC8ocIdHeFwPnluZE7APTyGhxSaS12kJ..."
    }
];

export default function Usuarios() {
    type User = {
        _id: string;
        fullName: string;
        email: string;
        roles: string[];
        imageUrl: string;
    };

    const users = data.map((user: User) => ({
        id: user._id,
        name: user.fullName,
        email: user.email,
        roles: user.roles,
        image: user.imageUrl,
    }));
    
    return (
        <AlertProvider> {/* Envolver todo en AlertProvider */}
            <div className="px-6 py-6 sm:px-14 sm:py-10 xl:px-16">
                <h2 className="text-cb-gray-letter font-bold text-5xl mb-7">Usuarios</h2>
                <FilteredUserTable users={users} />
            </div>
        </AlertProvider>
    );
}