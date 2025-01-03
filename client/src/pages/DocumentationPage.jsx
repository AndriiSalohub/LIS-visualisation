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
  Bug,
} from "lucide-react";

const DocumentationPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Документація</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Ласкаво просимо до повного довідника по платформі візуалізації
            алгоритму LIS! Тут ви знайдете все необхідне для розуміння та
            ефективного використання нашого інструменту. Ця документація охоплює
            детальний опис інтерфейсу, глибоке пояснення роботи алгоритму пошуку
            найдовшої зростаючої підпослідовності (LIS), а також покрокові
            інструкції з використання всіх функцій платформи. Незалежно від
            того, чи ви студент, який вивчає алгоритми, чи розробник, який шукає
            інтуїтивно зрозуміле представлення LIS, ця документація стане вашим
            надійним помічником.
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
                  Детальний опис всіх елементів керування та їх функцій для
                  зручної роботи з візуалізацією.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="main-interface">
                    <AccordionTrigger>Головний інтерфейс</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p>
                          Головний інтерфейс платформи розроблено для
                          максимальної зручності та інформативності. Тут ви
                          знайдете всі необхідні елементи для розуміння роботи
                          алгоритму LIS.
                        </p>
                        <h4 className="font-semibold">
                          Компоненти головного інтерфейсу:
                        </h4>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>
                            <span className="font-semibold">
                              Панель навігації
                            </span>{" "}
                            - розташована у верхній частині екрану і містить
                            посилання на основні розділи платформи, такі як
                            "Головна", "Документація", "Візуалізація" та
                            "Приклади". Це дозволяє швидко переміщатися між
                            різними частинами платформи.
                          </li>
                          <li>
                            <span className="font-semibold">
                              Область візуалізації
                            </span>{" "}
                            - центральна частина інтерфейсу, яка знаходиться на
                            сторінці "Візуалізація", де динамічно відображається
                            поточний стан алгоритму. Ви побачите кроки
                            виконання, зміни в масиві та підсвічування активних
                            елементів.
                          </li>
                          <li>
                            <span className="font-semibold">
                              Панель керування
                            </span>{" "}
                            - знаходиться ліворуч від області візуалізації і
                            містить елементи для контролю візуалізації, такі як
                            кнопки "Запуск", "Пауза", "Крок вперед" та
                            налаштування швидкості.
                          </li>
                          <li>
                            <span className="font-semibold">
                              Інформаційна панель
                            </span>{" "}
                            - розташована над елементом візуалізації і
                            відображає детальну інформацію про поточний крок
                            алгоритму, змінні, порівняння та інші важливі дані.
                          </li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="control-panel">
                    <AccordionTrigger>Панель керування</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p>
                          Панель керування надає вам повний контроль над
                          процесом візуалізації алгоритму.
                        </p>
                        <div className="flex items-center gap-2 mb-4">
                          <Play className="h-4 w-4" />
                          <span>
                            <span className="font-semibold">
                              Кнопка запуску
                            </span>{" "}
                            - запускає процес візуалізації алгоритму з початку
                            або з поточного стану після паузи.
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                          <Pause className="h-4 w-4" />
                          <span>
                            <span className="font-semibold">Кнопка паузи</span>{" "}
                            - призупиняє візуалізацію, дозволяючи вам детально
                            розглянути поточний стан алгоритму. Натисніть ще
                            раз, щоб продовжити.
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                          <SkipForward className="h-4 w-4" />
                          <span>
                            <span className="font-semibold">
                              Кнопка наступного кроку
                            </span>{" "}
                            - дозволяє перейти до наступного кроку виконання
                            алгоритму, що особливо корисно для покрокового
                            аналізу.
                          </span>
                        </div>
                        <Separator className="my-4" />
                        <h4 className="font-semibold">
                          Налаштування швидкості:
                        </h4>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>
                            <span className="font-semibold">
                              Повзунок швидкості анімації
                            </span>{" "}
                            - дозволяє регулювати швидкість візуалізації, від
                            дуже повільної для детального аналізу до швидкої для
                            загального огляду.
                          </li>
                          <li>
                            <span className="font-semibold">
                              Перемикач автоматичного режиму
                            </span>{" "}
                            - вмикає або вимикає автоматичне відтворення
                            алгоритму. Увімкнений режим дозволяє алгоритму
                            виконуватися безперервно, а вимкнений вимагає
                            ручного переходу між кроками.
                          </li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="visualization-area">
                    <AccordionTrigger>Область візуалізації</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p>
                          Область візуалізації є ключовою частиною інтерфейсу,
                          де відбувається основне відображення роботи алгоритму.
                        </p>
                        <h4 className="font-semibold">
                          Елементи візуалізації:
                        </h4>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>
                            <span className="font-semibold">Масив чисел</span> -
                            відображення вхідної послідовності чисел, над якою
                            працює алгоритм. Кожен елемент масиву чітко
                            позначений.
                          </li>
                          <li>
                            <span className="font-semibold">Поточний крок</span>{" "}
                            - візуально підсвічує елементи масиву, які беруть
                            участь у поточному кроці алгоритму. Кольорове
                            кодування може використовуватися для виділення
                            порівнюваних або оновлюваних елементів.
                          </li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="code-debugger">
                    <AccordionTrigger>Візуальна відладка коду</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Bug className="h-5 w-5" />
                          <h4 className="font-semibold">
                            Інструмент візуальної відладки коду:
                          </h4>
                        </div>
                        <p>
                          Цей інструмент, розташований у нижньому лівому куті,
                          дозволяє спостерігати за покроковим виконанням коду
                          алгоритму LIS. При натисканні на кнопку "Візуальна
                          відладка коду" відкривається панель, де відображаються
                          основні етапи алгоритму: "Ініціалізація", "Основний
                          цикл" та "Відновлення послідовності".
                        </p>
                        <p>
                          Під час виконання алгоритму, поточний етап буде
                          підсвічено, а активні рядки коду виділено кольором, що
                          допомагає зрозуміти логіку роботи алгоритму на рівні
                          коду. Панель відкривається та закривається з плавною
                          анімацією для зручності користування.
                        </p>
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
                  зростаючої підпослідовності, його принципів та етапів.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      <span className="font-semibold">
                        LIS (Longest Increasing Subsequence)
                      </span>{" "}
                      - це класична задача в інформатиці, яка полягає у
                      знаходженні найдовшої підпослідовності елементів у заданій
                      послідовності, де кожен наступний елемент є строго більшим
                      за попередній. Цей алгоритм має широке застосування в
                      різних областях, від біоінформатики до аналізу фінансових
                      даних.
                    </AlertDescription>
                  </Alert>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="algorithm-theory">
                      <AccordionTrigger>Теоретична основа</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <p>
                            Алгоритм пошуку найдовшої зростаючої
                            підпослідовності часто реалізується з використанням
                            принципів динамічного програмування. Це дозволяє
                            ефективно розв'язувати задачу, розбиваючи її на
                            менші підзадачі.
                          </p>
                          <h4 className="font-semibold">Основні концепції:</h4>
                          <ul className="list-disc pl-6 space-y-2">
                            <li>
                              <span className="font-semibold">
                                Динамічне програмування
                              </span>{" "}
                              - метод розв'язання складних задач шляхом їх
                              розбиття на простіші підзадачі та збереження
                              результатів їх розв'язання для уникнення повторних
                              обчислень. У контексті LIS, ми обчислюємо довжину
                              LIS для префіксів вхідної послідовності.
                            </li>
                            <li>
                              <span className="font-semibold">
                                Оптимальна підструктура
                              </span>{" "}
                              - властивість задачі LIS, яка означає, що
                              оптимальне рішення задачі містить оптимальні
                              рішення її підзадач. Зокрема, LIS послідовності,
                              що закінчується на певному елементі, залежить від
                              LIS послідовностей, що закінчуються на попередніх
                              елементах.
                            </li>
                            <li>
                              <span className="font-semibold">
                                Перекриваючі підзадачі
                              </span>{" "}
                              - особливість реалізації, коли одні й ті самі
                              підзадачі розв'язуються кілька разів. Динамічне
                              програмування дозволяє уникнути цього, зберігаючи
                              результати розв'язання підзадач.
                            </li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="algorithm-steps">
                      <AccordionTrigger>Кроки алгоритму</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <p>
                            Розглянемо класичний підхід до розв'язання задачі
                            LIS за допомогою динамічного програмування.
                          </p>
                          <ol className="list-decimal pl-6 space-y-2">
                            <li>
                              <span className="font-semibold">
                                Ініціалізація:
                              </span>
                              <ul className="list-disc pl-6 mt-2">
                                <li>
                                  <span className="font-semibold">
                                    Створення масиву довжин (d)
                                  </span>{" "}
                                  - створюється масив `d` такого ж розміру, як і
                                  вхідна послідовність. `d[i]` зберігатиме
                                  довжину найдовшої зростаючої підпослідовності,
                                  що закінчується на елементі з індексом `i`.
                                  Початково всі елементи `d` встановлюються в 1,
                                  оскільки кожен елемент сам по собі є
                                  зростаючою підпослідовністю довжини 1.
                                </li>
                                <li>
                                  <span className="font-semibold">
                                    Створення масиву попередніх індексів (prev)
                                  </span>{" "}
                                  - створюється масив `prev` для відновлення
                                  самої LIS. `prev[i]` зберігатиме індекс
                                  попереднього елемента в LIS, що закінчується
                                  на елементі з індексом `i`. Початково всі
                                  елементи `prev` можуть бути встановлені в
                                  `null` або `-1`.
                                </li>
                              </ul>
                            </li>
                            <li>
                              <span className="font-semibold">
                                Основний цикл:
                              </span>
                              <ul className="list-disc pl-6 mt-2">
                                <li>
                                  {" "}
                                  <span className="font-semibold">
                                    Перебір всіх елементів послідовності
                                  </span>{" "}
                                  - алгоритм ітерується по вхідній
                                  послідовності, починаючи з другого елемента.
                                </li>
                                <li>
                                  <span className="font-semibold">
                                    Пошук найкращого попереднього елемента
                                  </span>{" "}
                                  - для кожного елемента <code>arr[i]</code>{" "}
                                  перевіряються всі попередні елементи{" "}
                                  <code>arr[j]</code> (де <code>j &lt; i</code>
                                  ). Якщо <code>arr[i] &gt; arr[j]</code>, це
                                  означає, що ми можемо продовжити LIS, що
                                  закінчується на <code>arr[j]</code>, додавши
                                  до неї <code>arr[i]</code>.
                                </li>
                                <li>
                                  <span className="font-semibold">
                                    Оновлення значень d[i] та prev[i]
                                  </span>{" "}
                                  - якщо <code>d[i] &lt; d[j] + 1</code>, то
                                  довжина LIS, що закінчується на{" "}
                                  <code>arr[i]</code>, може бути збільшена. У
                                  цьому випадку <code>d[i]</code> оновлюється до{" "}
                                  <code>d[j] + 1</code>, а <code>prev[i]</code>{" "}
                                  встановлюється в <code>j</code>, вказуючи на
                                  попередній елемент у цій LIS.
                                </li>
                              </ul>
                            </li>
                            <li>
                              <span className="font-semibold">
                                Відновлення відповіді:
                              </span>
                              <ul className="list-disc pl-6 mt-2">
                                <li>
                                  <span className="font-semibold">
                                    Пошук позиції максимального елемента в d
                                  </span>{" "}
                                  - після завершення основного циклу, найбільше
                                  значення в масиві `d` вказує на довжину
                                  найдовшої зростаючої підпослідовності.
                                  Знаходиться індекс цього максимального
                                  елемента.
                                </li>
                                <li>
                                  <span className="font-semibold">
                                    Відновлення послідовності через prev
                                  </span>{" "}
                                  - використовуючи масив `prev`, можна відновити
                                  саму LIS, починаючи з елемента, індекс якого
                                  був знайдений на попередньому кроці, і
                                  рухаючись назад по посиланнях у масиві `prev`.
                                </li>
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
                            <li>
                              <span className="font-semibold">
                                Часова складність: O(n²)
                              </span>{" "}
                              - через використання двох вкладених циклів у
                              основному алгоритмі, де `n` - довжина вхідної
                              послідовності. Для кожного елемента ми перевіряємо
                              всі попередні елементи.
                            </li>
                            <li>
                              <span className="font-semibold">
                                Просторова складність: O(n)
                              </span>{" "}
                              - для зберігання масивів `d` і `prev`, розмір яких
                              лінійно залежить від розміру вхідної
                              послідовності.
                            </li>
                            <li>
                              <span className="font-semibold">
                                Можливості оптимізації
                              </span>{" "}
                              - існують оптимізовані підходи до розв'язання
                              задачі LIS з використанням бінарного пошуку, які
                              дозволяють зменшити часову складність до O(n log
                              n). Ці методи не змінюють просторову складність,
                              але значно покращують продуктивність для великих
                              вхідних даних.
                            </li>
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
                  для ефективної візуалізації алгоритму LIS.
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
                          <li>
                            <span className="font-semibold">
                              Вибір режиму роботи (автоматичний/ручний)
                            </span>{" "}
                            - перед початком візуалізації ви можете обрати, як
                            алгоритм буде виконуватися: автоматично, крок за
                            кроком, або вручну, самостійно керуючи кожним
                            етапом.
                          </li>
                          <li>
                            <span className="font-semibold">
                              Налаштування параметрів візуалізації
                            </span>{" "}
                            - налаштуйте швидкість анімації та інші параметри
                            відображення для комфортного сприйняття процесу.
                          </li>
                          <li>
                            <span className="font-semibold">
                              Введення послідовності або вибір прикладу
                            </span>{" "}
                            - введіть власну послідовність чисел для аналізу або
                            виберіть один з наведених прикладів для швидкого
                            ознайомлення.
                          </li>
                          <li>
                            <span className="font-semibold">
                              Запуск візуалізації
                            </span>{" "}
                            - натисніть кнопку "Запуск", щоб розпочати процес
                            візуалізації алгоритму LIS з заданими параметрами та
                            вхідною послідовністю.
                          </li>
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
                          <li>
                            <span className="font-semibold">
                              Ручне введення чисел
                            </span>{" "}
                            - ви можете ввести послідовність чисел вручну,
                            розділяючи їх комами у відповідному текстовому полі
                            при створенні прикладу на сторінці "Приклади".
                          </li>
                          <li>
                            <span className="font-semibold">
                              Випадкова генерація
                            </span>{" "}
                            - скористайтеся функцією випадкової генерації, щоб
                            автоматично створити послідовність чисел заданої
                            довжини та діапазону.
                          </li>
                          <li>
                            <span className="font-semibold">
                              Вибір з готових прикладів
                            </span>{" "}
                            - оберіть одну з наперед визначених послідовностей
                            для демонстрації роботи алгоритму на типових
                            випадках.
                          </li>
                          <li>
                            <span className="font-semibold">
                              Завантаження з файлу
                            </span>{" "}
                            - завантажте послідовність чисел з текстового файлу,
                            де числа розділені пробілами або новими рядками.
                          </li>
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
                              <li>
                                <span className="font-semibold">
                                  Старт/Пауза
                                </span>{" "}
                                - запуск або зупинка процесу візуалізації
                                алгоритму.
                              </li>
                              <li>
                                <span className="font-semibold">
                                  Крок вперед
                                </span>{" "}
                                - перехід до наступного кроку виконання
                                алгоритму для детального аналізу.
                              </li>
                              <li>
                                <span className="font-semibold">
                                  Крок назад
                                </span>{" "}
                                - повернення до попереднього кроку для
                                повторного перегляду.
                              </li>
                              <li>
                                <span className="font-semibold">Скидання</span>{" "}
                                - повернення візуалізації до початкового стану з
                                можливістю введення нової послідовності.
                              </li>
                            </ul>
                          </li>
                          <li>
                            <span className="font-semibold">
                              Налаштування швидкості:
                            </span>
                            <ul className="list-disc pl-6 mt-2">
                              <li>
                                <span className="font-semibold">
                                  Повзунок швидкості
                                </span>{" "}
                                - регулювання швидкості відтворення анімації для
                                більш детального або швидкого перегляду.
                              </li>
                              <li>
                                <span className="font-semibold">
                                  Попередньо встановлені значення швидкості
                                </span>{" "}
                                - можливість вибору стандартних значень
                                швидкості для зручності.
                              </li>
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
