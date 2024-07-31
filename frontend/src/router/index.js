import { createRouter, createWebHistory } from 'vue-router'
import LoginView from "../views/LoginView.vue"
import RegisterView from "../views/RegisterView.vue"
import ProductsView from '@/views/app/ProductsView.vue'
import { useAuth } from '@/stores/Auth'
import RecuperatePassword from '@/views/RecuperatePassword.vue'
import ChangePasswordView from "@/views/ChangePasswordView.vue"
import UserCartView from '@/views/app/UserCartView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path : "/login",
      name : "login",
      component : LoginView,
      meta : {
        transitionAuth : "login",
        authentication : false
      }
    },
    {
      path : "/recuperateAccount",
      name : "recuperateAccount",
      component : RecuperatePassword
    },
    {
      path : "/reset-password",
      name : "changePassword",
      component : ChangePasswordView,
      meta : {
        
      }
    },
    {
      path : "/register",
      name : "register",
      component : RegisterView,
      meta : {
        transitionAuth : "register",
        authentication : false
      }
    },
    {
      path : "/products",
      name : "products",
      component : ProductsView,
      meta : {
        authentication : true
      }
    },
    {
      path : "/cart",
      name : "userCart",
      component : UserCartView,
      meta : {
        authentication : true
      }
    },
    {
      path : "/admin",
      name : "admin",
      component : () => import("../views/app/admin/AdminView.vue"),
      meta : {
        authentication : true
      },
      beforeEnter : async(to,from,next)=>{
        const auth = useAuth();
        try{
          //solo el administrador podra ingresar a la ruta
          const response = await auth.isAdmin();
          return next();
        }
        catch(e){
          return next("/products");
        }
      }
    }
  ]
})

router.beforeEach(async (to,from,next)=>{
  if(to.meta.authentication){
    const auth = useAuth();
    try{
      const response = await auth.current();
      if(response.data){
        return next();
      }
      return next("/login")
    }
    catch(e){
      return next("/login")
    }
  }
  if(to.name == "changePassword" && !to.query.token){
    return next("/login");
  }
  next()
})


export default router
