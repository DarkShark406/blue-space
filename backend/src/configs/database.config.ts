import { connect, ConnectOptions } from "mongoose";

export const dbConnect = () => {
  connect(
    "mongodb+srv://bluespaceuel:MDYJxMczo62b97v7@bluespace.rwvuspm.mongodb.net/bluespace",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions
  ).then(
    () => console.log("connect successfully"),
    (error) => console.log(error)
  );
};
