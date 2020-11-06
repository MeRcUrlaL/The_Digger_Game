Игра Digger

id's:
    0: air
    1: background stone
    2: grass
    3: stone
    4: coal
    5: copper
    6: tin
    7: iron
    8:
    9:
    10:
    11:
    12:
    13:
    14:
    15:
    16:

requirements:
    + Генерируемое игровое поле в виде двумерного массива с id блока 
    + Управление бурильной машиной с помощью кнопок WASD (или стрелочек)
    + Камера двигается за бурильной машиной, при этом прижимается к краям и не выходит за границы карты.
    - Заемнение вокруг бурильной машины на глубине от 3-х блоков
    - Прочность корпуса в виде шкалы в левом верхнем углу.
    + Трюм - внутренний склад бурильной машины
    + Магазин, в котором можно продать ресурсы из трюма.
    + Заправочная станция с интерфесом (1-я кнопка "Заправить" 2-я кнопка "Отмена") на середине окна подсказка со стоимостью заправки.
    - Станция улучшения с интерфейсом и следующим ассортиментом: Топливный бак, Бур, Корпус, Шасси  
    - Все конфиги засунуть в config.json файл
    - Разбить код на логические модули
    - Добавить возможность настройки частоты генерации руд.
    - Добавить генерацию определённых руд по высоте
    - Добавить механику прочности блоков
    - Если заканчивается топливо - вспывающее окно с возможностью подняться на поверхность 3$/блок по оси Y или заправиться 2$/ед.топлива
    - Возможность сохранять прогресс в json файл и загружать игру из json'a