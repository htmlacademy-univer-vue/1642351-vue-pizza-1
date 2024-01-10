import { AddressResource } from "./address.resource";
import { DoughResource } from "./dough.resource";
import { IngredientResource } from "./ingredients.resource";
import { MiscResource } from "./misc.resource";
import { OrderResource } from "./order.resource";
import { SauceResource } from "./sauce.resource";
import { SizeResource } from "./size.resource";
import { AuthService } from "../api/auth.service";

export default {
  address: new AddressResource(),
  dough: new DoughResource(),
  ingredient: new IngredientResource(),
  misc: new MiscResource(),
  order: new OrderResource(),
  sauce: new SauceResource(),
  size: new SizeResource(),
  auth: new AuthService("http://localhost:8080/api"),
};
