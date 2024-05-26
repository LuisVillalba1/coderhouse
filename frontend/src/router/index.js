import { createRouter, createWebHistory } from 'vue-router'
import LoginView from "../views/LoginView.vue"
import RegisterView from "../views/RegisterView.vue"
import ProductsView from '@/views/app/ProductsView.vue'
import { useAuth } from '@/stores/Auth'


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
  next()
})


export default router
