import express from "express";
const app = express();
const PORT = 3000;

app.use(express.json());
let customers = [
  { id: 1, name: "Alice", email: "email@gmail.com" },
  { id: 2, name: "Bob", email: "email@gmail.com" },
  { id: 3, name: "Charlie", email: "email@gmail.com" },
];

//GET
app.get("/customers", (req, res) => {
  res.status(200).json(users);
});

app.get("/customers/:id", (req, res) => {
  const customerId = parseInt(req.params.id);
  const customer = customers.find((u) => u.id === customerId);
  if (!customer) {
    return res.status(404).json({ message: "A felhasználó nem található!" });
  }
  res.status(200).json(customer);
});

//POST
app.post("/customers", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "Kötelező megadni a nevet és az email címet!" });
  }
  const id = customers[customers.length - 1]?.id + 1 || 1;
  const newCustomer = { id, name, age };
  users.push(newCustomer);
});

//PUT
app.put("customers/:id", (req, res) => {
  const customerId = parseInt(req.params.id);
  let customer = customers.find(c => c.id === customerId)
  if (!customer){
    return res.status(404).json({message: 'A felhasználó nem található!'})
  }
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "Kötelező megadni a nevet és az email címet!" });
  }
  const index = customers.indexOf(customer);
  customer = {...customer, name, email};
  customers[index] = customer;
  res.status(200).json(customer);
});

//DELETE
app.delete('/customers/:id', (req, res) =>{
  const customerId = parseInt(req.params.id);
  customers = customers.filter(c => c.id !== customerId);
  res.status(200).json({message: 'Felhasználó törölve!'});
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
