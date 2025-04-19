import { ReactNode } from "react";

 export interface FormValues {
    first_name?: string;
    last_name?: string;
    password?: string;
    email?: string;
    role?: string;
    otp?:string
    password_new?:string;
  }




  export interface CustomApiError {
    response?: {
      data?: {
        message?: string;
      };
    };
  }



  export interface ProtectedRouteProps {
    children: ReactNode; // Define the type for the children prop
  }



  export interface Book {
    _id: string;
    name: string;
    author: string;
    category: string;
    description: string;
    image: string;
    price: number;
    status: "active" | "inactive"; // Assuming status has predefined values
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    __v: number;
  }


  export interface bookProp{
    productInfo:Book;
    books?:booksinfo;
    index?:string |number;
  }


  export interface booksinfo{
    nameofbook:string ;
    details:string;
    photo:string;
  }



   export interface BookSlider {
    authors: { name: string; key: string }[]; // Array of authors
    availability: {
      status: string;
      available_to_browse: boolean;
      available_to_borrow: boolean;
      available_to_waitlist: boolean;
      is_printdisabled: boolean;
      is_readable: boolean;
      is_lendable: boolean;
      identifier?: string;
    };
    cover_edition_key: string;
    cover_id: number;
    edition_count: number;
    first_publish_year: number;
    has_fulltext: boolean;
    ia: string;
    ia_collection: string[];
    key: string;
    lending_edition?: string;
    lending_identifier?: string;
    printdisabled: boolean;
    public_scan: boolean;
    subject: string[];
    title: string;
  }
  



  export interface SlideProp { 
    cover_id: number; 
    title: string; 
    first_publish_year: number; 
    authors: { name: string }[] 
  }



  export interface categorySlide {
    _id: string;
    title: string;
    status: "active" | "inactive"; // Assuming status has predefined values
  }




  export interface dbookdata{
    id: string;
    title: string;
    subtitle: string;
    authors: string; // Assuming authors are stored as a single string
    image: string;
    url: string;
  }



  export interface AuthState {
    showLogin: boolean;
    showRegister: boolean;
    showForgotPassword: boolean;
    showResetPassword: boolean;
  }

  export interface UserState {
    token: string;
  }

 export interface carInfoDetails{
  customer:string;
items:[];
total:number;
_id:string;

}



export interface CartState{
  cartData: carInfoDetails | null;
  error: string | undefined | null;
  isLoading: boolean;
  isError: boolean;
};




 









  export interface BookDetailsInfo extends Book {
    title?: string; 
  }



  export interface BookDataFromPublicApi {
    authors: string;
    description: string;
    download: string;
    id: string;
    image: string;
    pages: string;
    publisher: string;
    status: string;
    subtitle: string;
    title: string;
    url: string;
    year: string;
  }




  export interface categoryShowItem{
    books:[];
    status:string;
    title:string;
    _id:string;
   

  }


  export interface categoryDetailsItem{
  
    status:string;
    title:string;
    _id:string;
   

  }


  export interface Author {
    _id: string;
    name: string;
    description: string;
    image: string; // URL to the author's image or placeholder
    bookName: string;
    price: number;
    status: "active" | "inactive"; // Assuming status has predefined values
  }



 export  interface CounterProviderProps {
    children: ReactNode;
}



 export interface CounterContextType {
  counter: number;
  handleIncreaseCounter: () => void;
  handleDecreaseCounter: () => void;
}








 export interface AddToCartPayload {
  bookId?: string | undefined;
  bookQuantity?: number;
  userToken?: string | null;
  basketId?:string;
}








interface whishListReducer {
  whislistBooks:[],
  isWished:boolean,
}

export interface RootState {
  userReducer: UserState;
  authReducer: AuthState;
  cartReducer:CartState;
  whishListReducer:whishListReducer;
}

export  interface bookCartInfo {
  book:string;
quantity:number;
_id:string;
}






export interface tokenDecodedinter{
  email:string
  exp:number;
    iat:number;
  role:string;
    sub:string;
  
}



 export interface CartItem {
  book: string | { _id: string }; // depending on what you get
  quantity: number;
}



export interface Bookinfo {
  _id: string;
  price: number;
}

export interface CartIteminfo {
  _id: string;
  book?: Bookinfo;
  quantity: number;
}





interface DeliveryLocation {
  type: "Point";
  coordinates: [number, number];
}

interface DeliveryAddress {
  country: string;
  city: string;
  state: string;
  building: number;
  street: string;
  floor: number;
  appartment: number;
  mobile: string;
  additional_info: string;
  location: DeliveryLocation;
}

export interface CheckoutData {
  token: string;
  delivery_address: DeliveryAddress;
}







export interface userDecodedInfo {
  email:string;
exp:number;
iat:number;
role:string;
sub:string;

}










export interface CustomerOrder {
  _id: string;
  customer: string;
  delivery_address: DeliveryAddress | null;
  items: OrderItem[];
  payment_ref: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled' | string; // Expand as needed
  total: number;
}

export interface OrderItem {
  _id: string;
  book: string;      // Book ID
  quantity: number;
}

