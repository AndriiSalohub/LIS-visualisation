import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  Code2,
  BookOpen,
  Settings,
  Info,
  Play,
  Pause,
  SkipForward,
  Database,
} from "lucide-react";

const DocumentationPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Документація</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Повний довідник по використанню платформи візуалізації алгоритму
            LIS, включаючи детальний опис інтерфейсу, пояснення роботи алгоритму
            та інструкції з використання всіх функцій
          </p>
        </div>

        <Tabs defaultValue="interface" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
            <TabsTrigger value="interface" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Інтерфейс
            </TabsTrigger>
            <TabsTrigger value="algorithm" className="flex items-center gap-2">
              <Code2 className="h-4 w-4" />
              Алгоритм
            </TabsTrigger>
            <TabsTrigger
              value="instructions"
              className="flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4" />
              Інструкції
            </TabsTrigger>
          </TabsList>

          <TabsContent value="interface">
            <Card>
              <CardHeader>
                <CardTitle>Документація інтерфейсу</CardTitle>
                <CardDescription>
                  Детальний опис всіх елементів керування та їх функцій
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="main-interface">
                    <AccordionTrigger>Головний інтерфейс</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <h4 className="font-semibold">
                          Компоненти головного інтерфейсу:
                        </h4>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>
                            Панель навігації - містить основні розділи платформи
                          </li>
                          <li>
                            Область візуалізації - показує поточний стан
                            алгоритму
                          </li>
                          <li>
                            Панель керування - елементи для контролю
                            візуалізації
                          </li>
                          <li>
                            Інформаційна панель - відображає деталі поточного
                            кроку
                          </li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="control-panel">
                    <AccordionTrigger>Панель керування</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                          <Play className="h-4 w-4" />
                          <span>Кнопка запуску</span>
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                          <Pause className="h-4 w-4" />
                          <span>Кнопка паузи</span>
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                          <SkipForward className="h-4 w-4" />
                          <span>Кнопка наступного кроку</span>
                        </div>
                        <Separator className="my-4" />
                        <h4 className="font-semibold">
                          Налаштування швидкості:
                        </h4>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>
                            Повзунок швидкості анімації - регулює швидкість
                            візуалізації
                          </li>
                          <li>
                            Перемикач автоматичного режиму - вмикає/вимикає
                            автоматичне відтворення
                          </li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="visualization-area">
                    <AccordionTrigger>Область візуалізації</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <h4 className="font-semibold">
                          Елементи візуалізації:
                        </h4>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>
                            Масив чисел - відображення вхідної послідовності
                          </li>
                          <li>
                            Поточний крок - підсвічування активних елементів
                          </li>
                          <li>
                            Проміжні результати - показ знайдених
                            підпослідовностей
                          </li>
                          <li>
                            Статус виконання - індикатор прогресу алгоритму
                          </li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="algorithm">
            <Card>
              <CardHeader>
                <CardTitle>Алгоритм LIS</CardTitle>
                <CardDescription>
                  Детальне пояснення роботи алгоритму пошуку найдовшої
                  зростаючої підпослідовності
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      LIS (Longest Increasing Subsequence) - це алгоритм
                      динамічного програмування, який знаходить найдовшу
                      підпослідовність елементів у масиві, де кожен наступний
                      елемент більший за попередній.
                    </AlertDescription>
                  </Alert>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="algorithm-theory">
                      <AccordionTrigger>Теоретична основа</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <h4 className="font-semibold">Основні концепції:</h4>
                          <ul className="list-disc pl-6 space-y-2">
                            <li>
                              Динамічне програмування - метод розв'язання
                              складних задач
                            </li>
                            <li>
                              Оптимальна підструктура - властивість задачі LIS
                            </li>
                            <li>
                              Перекриваючі підзадачі - особливість реалізації
                            </li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="algorithm-steps">
                      <AccordionTrigger>Кроки алгоритму</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <ol className="list-decimal pl-6 space-y-2">
                            <li>
                              <span className="font-semibold">
                                Ініціалізація:
                              </span>
                              <ul className="list-disc pl-6 mt-2">
                                <li>Створення масиву довжин (d)</li>
                                <li>
                                  Створення масиву попередніх індексів (prev)
                                </li>
                              </ul>
                            </li>
                            <li>
                              <span className="font-semibold">
                                Основний цикл:
                              </span>
                              <ul className="list-disc pl-6 mt-2">
                                <li>Перебір всіх елементів послідовності</li>
                                <li>Пошук найкращого попереднього елемента</li>
                                <li>Оновлення значень d[i] та prev[i]</li>
                              </ul>
                            </li>
                            <li>
                              <span className="font-semibold">
                                Відновлення відповіді:
                              </span>
                              <ul className="list-disc pl-6 mt-2">
                                <li>
                                  Пошук позиції максимального елемента в d
                                </li>
                                <li>Відновлення послідовності через prev</li>
                              </ul>
                            </li>
                          </ol>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="complexity">
                      <AccordionTrigger>Складність алгоритму</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <h4 className="font-semibold">Аналіз складності:</h4>
                          <ul className="list-disc pl-6 space-y-2">
                            <li>Часова складність: O(n²)</li>
                            <li>Просторова складність: O(n)</li>
                            <li>Можливості оптимізації</li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="instructions">
            <Card>
              <CardHeader>
                <CardTitle>Інструкції з використання</CardTitle>
                <CardDescription>
                  Детальні інструкції щодо використання всіх функцій платформи
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="getting-started">
                    <AccordionTrigger>Початок роботи</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <h4 className="font-semibold">Перші кроки:</h4>
                        <ol className="list-decimal pl-6 space-y-2">
                          <li>Вибір режиму роботи (автоматичний/ручний)</li>
                          <li>Налаштування параметрів візуалізації</li>
                          <li>Введення послідовності або вибір прикладу</li>
                          <li>Запуск візуалізації</li>
                        </ol>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="input-methods">
                    <AccordionTrigger>Методи введення даних</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <h4 className="font-semibold">
                          Способи введення послідовності:
                        </h4>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Ручне введення чисел</li>
                          <li>Випадкова генерація</li>
                          <li>Вибір з готових прикладів</li>
                          <li>Завантаження з файлу</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="visualization-controls">
                    <AccordionTrigger>Керування візуалізацією</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <h4 className="font-semibold">Елементи керування:</h4>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>
                            <span className="font-semibold">
                              Кнопки навігації:
                            </span>
                            <ul className="list-disc pl-6 mt-2">
                              <li>Старт/Пауза - запуск/зупинка візуалізації</li>
                              <li>Крок вперед - перехід до наступного кроку</li>
                              <li>
                                Крок назад - повернення до попереднього кроку
                              </li>
                              <li>
                                Скидання - повернення до початкового стану
                              </li>
                            </ul>
                          </li>
                          <li>
                            <span className="font-semibold">
                              Налаштування швидкості:
                            </span>
                            <ul className="list-disc pl-6 mt-2">
                              <li>
                                Повзунок швидкості - регулювання темпу
                                візуалізації
                              </li>
                              <li>Попередньо встановлені значення швидкості</li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DocumentationPage;
