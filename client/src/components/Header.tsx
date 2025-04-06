import { useState, FC } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { PlayCircle, Code, BookOpen, Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className="text-xl font-bold text-primary hover:text-primary/90 transition-colors"
                  href="/"
                >
                  <NavLink to="/">LIS Візуалізатор</NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-4">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                    Візуалізація
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid p-4 w-[400px] lg:w-[500px] bg-white rounded-lg shadow-lg">
                      <NavigationMenuLink href="/visualization">
                        <NavLink
                          to="/visualization"
                          className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 transition-colors"
                        >
                          <PlayCircle className="w-5 h-5 text-primary" />
                          <div>
                            <h3 className="text-sm font-medium">
                              Інтерактивна візуалізація
                            </h3>
                            <p className="text-xs text-gray-500">
                              Візуалізуйте роботу алгоритму крок за кроком
                            </p>
                          </div>
                        </NavLink>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                    Приклади
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid p-4 w-[400px] lg:w-[500px] bg-white rounded-lg shadow-lg">
                      <NavigationMenuLink href="/examples">
                        <NavLink
                          to="/examples"
                          className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 transition-colors"
                        >
                          <Code className="w-5 h-5 text-primary" />
                          <div>
                            <h3 className="text-sm font-medium">
                              Бібліотека прикладів
                            </h3>
                            <p className="text-xs text-gray-500">
                              Перегляньте та створіть власні приклади
                            </p>
                          </div>
                        </NavLink>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink href="/docs">
                    <NavLink
                      to="/documentation"
                      className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                    >
                      <BookOpen className="w-5 h-5 mr-2" />
                      Документація
                    </NavLink>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-1 border-t border-gray-200">
            <NavigationMenu>
              <NavigationMenuList className="flex flex-col space-y-1">
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/visualization"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    <PlayCircle className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">Візуалізація</div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Візуалізуйте роботу алгоритму
                      </p>
                    </div>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/examples"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    <Code className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">Приклади</div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Перегляньте готові приклади
                      </p>
                    </div>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/docs"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    <BookOpen className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">Документація</div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Довідкова інформація
                      </p>
                    </div>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
