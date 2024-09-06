import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger, navigationMenuTriggerStyle,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import Link from "next/link";
// import SignInButton from "@/components/buttons/SignInButton";



const AdminNavBar = () => {

    return (
        <div className={'flex justify-between gap-2 m-2'}>
        <nav>
            <NavigationMenu>
                <NavigationMenuList>

                    <NavigationMenuItem>
                        <Link href={"/admin"} legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Overview
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <Link href={"/admin/products"} legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Products
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <Link href={"/admin/orders"} legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Orders
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>


                </NavigationMenuList>
            </NavigationMenu>

        </nav>
            {/*<SignInButton/>*/}
        </div>
    );
};

export default AdminNavBar;