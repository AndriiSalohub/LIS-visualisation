import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight, Play, Book, Code } from "lucide-react";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <section className="container mx-auto px-4 py-12 md:py-12 lg:py-12">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-block">
            <span className="bg-muted text-muted-foreground px-4 py-1.5 rounded-full text-sm font-medium">
              Інтерактивна платформа
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
            Візуалізація алгоритму LIS
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto px-4 leading-relaxed">
            Інтерактивна платформа для вивчення та розуміння алгоритму
            знаходження найдовшої зростаючої підпослідовності
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 px-4">
            <NavLink to="/visualization">
              <Button
                size="lg"
                className="gap-2 w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
              >
                <Play className="w-5 h-5 flex-shrink-0" />
                <span className="whitespace-nowrap">Почати візуалізацію</span>
              </Button>
            </NavLink>
            <NavLink to="/documentation">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 w-full sm:w-auto border-2 border-border hover:bg-muted transition-colors text-foreground"
              >
                <Book className="w-5 h-5 flex-shrink-0" />
                <span className="whitespace-nowrap">
                  Переглянути документацію
                </span>
              </Button>
            </NavLink>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <Card className="group hover:shadow-lg transition-shadow duration-300 border border-border bg-card">
            <CardHeader className="space-y-4">
              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors">
                <Play className="w-6 h-6 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
              </div>
              <CardTitle className="text-2xl font-bold text-card-foreground">
                Інтерактивна візуалізація
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Покрокове відстеження роботи алгоритму з можливістю керування
                швидкістю та режимом виконання
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  <span>Автоматичний та ручний режими</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  <span>Налаштування швидкості</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  <span>Покрокова візуалізація</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-shadow duration-300 border border-border bg-card">
            <CardHeader className="space-y-4">
              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors">
                <Code className="w-6 h-6 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
              </div>
              <CardTitle className="text-2xl font-bold text-card-foreground">
                Бібліотека прикладів
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Велика колекція готових прикладів та можливість створення
                власних
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  <span>Готові приклади</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  <span>Створення власних прикладів</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  <span>Збереження та управління</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-shadow duration-300 border border-border bg-card sm:col-span-2 lg:col-span-1">
            <CardHeader className="space-y-4">
              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors">
                <Book className="w-6 h-6 text-muted-foreground group-hover:text-text-primary-foreground transition-colors" />
              </div>
              <CardTitle className="text-2xl font-bold text-muted-foreground">
                Детальна документація
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Вичерпні матеріали про алгоритм та використання платформи
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  <span>Опис алгоритму</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  <span>Інструкції з використання</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  <span>Приклади застосування</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
