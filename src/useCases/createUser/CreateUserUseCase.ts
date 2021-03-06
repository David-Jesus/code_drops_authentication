import { hash} from "bcryptjs";

import { client } from "../../prisma/client";

interface IUserRequest {
    name:     string;
    password: string;
    username: string;
}

class CreateUserUseCase {
    async execute({name, username, password}: IUserRequest) {
        // verificar se o usuario existe
        const userAlreadExists = await client.user.findFirst({
            where: {
                username,
            },
        });

        if(userAlreadExists) {
            throw new Error("User alread exists!");
        }

        // cadastra o usuario
        const passwordHash = await hash(password, 8);
        const user = await client.user.create({
            data: {
                name,
                username,
                password: passwordHash,
            },
        });

        return user;
    }
}

export { CreateUserUseCase }