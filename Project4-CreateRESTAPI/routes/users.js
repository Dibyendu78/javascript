import  express  from 'express';
import { v4 as uuidv4 } from 'uuid';


const router = express.Router();

let users = [];


//all routes in here are starting with /users
router.get('/', (req, res) =>{
   
    res.send(users);
} );

router.post('/', (req, res) =>{
    //console.log('POST ROUTE REACHED');
    const user = req.body;

 //  const userId= uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
  
  // const userWithId = { ...user, id: uuidv4() }

   users.push({ ...user, id: uuidv4() });

   // users.push(user);

    res.send(`User with the name ${user.fname} added to the database!`);

    //console.log(req.body);

    //users.push();
  //  res.send('POST ROUTE RERACHED');
    
});

// /users/2 => req.paras {id:2}

router.get('/:id', (req, res) =>{
    const {id} = req.params;

    const foundUser = users.find((user) => user.id === id);

    res.send(foundUser);
});

router.delete('/:id', (req, res) =>{
    const {id} = req.params;

    users = users.filter((user) => user.id !== id);

    res.send(`User with the id ${id} deleted from the database.`);
});

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const {fname, lname, age } = req.body;
    const user = users.find((user) => user.id === id);

    if(fname){
        user.fname = fname;
    }

    if(lname){
        user.lname = lname;
    }
    if(age){
        user.age = age;
    }

    res.send(`User with the id ${id} has been updated.`);

});


export default router;