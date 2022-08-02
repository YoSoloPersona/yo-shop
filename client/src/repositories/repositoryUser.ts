import axios from 'axios';

import { api } from './api';
import { User } from '../models/user';

class RepositoryUser {

    registrate(user: User) {
        axios
            .post(api.user.registration.toString(), user, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            //
            .then(({ status, data }) => {
                console.log(data);
            })
            //
            .catch((err) => {
                console.log(err);
            });
    }

}

export const repositoryUser = new RepositoryUser();