import {createClient} from 'villus';

const index = createClient({
    url: 'http://localhost:3000/graphql'
});
export default index
