"use client";

import { useState } from "react";
import PrintReportTemplate from "../shared/PrintReportTemplate";

interface Product {
  id: string;
  name: string;
  density: number; // in kg/m³
}

const PRODUCTS: Product[] = [
  { id: "1", name: "Acetona ( 20º )", density: 790 },
  { id: "2", name: "Ácido carbônico ( 0º, atm )", density: 1.98 },
  { id: "3", name: "Ácido cloridrico ( 15º, 40% )", density: 1190 },
  { id: "4", name: "Ácido fênico ( 0º )", density: 1085 },
  { id: "5", name: "Ácido nitrico ( 15º )", density: 1520 },
  { id: "6", name: "Ácido olêico", density: 890 },
  { id: "7", name: "Ácido patico", density: 1220 },
  { id: "8", name: "Ácido salicilico amorfo", density: 2200 },
  { id: "9", name: "Ácido salicilico crist.", density: 2600 },
  { id: "10", name: "Ácido sulfurico ( 15º )", density: 1850 },
  { id: "11", name: "Ácido sulfuroso ( 0º, atm )", density: 2.9 },
  { id: "12", name: "Ácido sulfuroso ( liq. )", density: 1400 },
  { id: "13", name: "Aço", density: 7800 },
  { id: "14", name: "Açucar branco", density: 1600 },
  { id: "15", name: "Agata", density: 2650 },
  { id: "16", name: "Água destilada ( 4º )", density: 1000 },
  { id: "17", name: "Água do mar ( 0º )", density: 1025 },
  { id: "18", name: "Alcatrão", density: 1200 },
  { id: "19", name: "Álcool", density: 790 },
  { id: "20", name: "Álcool amilico ( 20º )", density: 810 },
  { id: "21", name: "Álcool de lenha ( 0º )", density: 800 },
  { id: "22", name: "Álcool etílico ( 15º )", density: 790 },
  { id: "23", name: "Álcool metílico ( 4º )", density: 800 },
  { id: "24", name: "Aldeido ( 0º )", density: 800 },
  { id: "25", name: "Alpaca", density: 8550 },
  { id: "26", name: "Alumen", density: 1900 },
  { id: "27", name: "Alumínio", density: 2600 },
  { id: "28", name: "Aluminio fundido", density: 2560 },
  { id: "29", name: "Aluminio laminado", density: 2700 },
  { id: "30", name: "Aluminio quim. Puro", density: 2700 },
  { id: "31", name: "Alvaiade", density: 6400 },
  { id: "32", name: "Alvenaria de tijolo fresca", density: 2000 },
  { id: "33", name: "Alvenaria de tijolo seca", density: 1600 },
  { id: "34", name: "Amalgama natural", density: 13900 },
  { id: "35", name: "Âmbar", density: 1100 },
  { id: "36", name: "Amianto ( asbesto )", density: 2500 },
  { id: "37", name: "Amianto papelão", density: 1200 },
  { id: "38", name: "Amido", density: 1500 },
  { id: "39", name: "Anilina ( 0º )", density: 1040 },
  { id: "40", name: "Antimônio", density: 6700 },
  { id: "41", name: "Antracita", density: 1550 },
  { id: "42", name: "Apatita", density: 3190 },
  { id: "43", name: "Ar ( 0º, atm )", density: 1.29 },
  { id: "44", name: "Aragonita", density: 2930 },
  { id: "45", name: "Ardosia", density: 2800 },
  { id: "46", name: "Ardosia xistosa", density: 2700 },
  { id: "47", name: "Areia fina seca", density: 1500 },
  { id: "48", name: "Areia fina umida", density: 1800 },
  { id: "49", name: "Areia grossa", density: 1600 },
  { id: "50", name: "Areia grossa seca", density: 1500 },
  { id: "51", name: "Areia quartzosa seca", density: 1525 },
  { id: "52", name: "Areia quartzosa úmida", density: 1800 },
  { id: "53", name: "Areia seca", density: 1500 },
  { id: "54", name: "Areia úmida", density: 1800 },
  { id: "55", name: "Arenito", density: 2300 },
  { id: "56", name: "Argamassa", density: 1800 },
  { id: "57", name: "Argamassa cal hidráulica", density: 1900 },
  { id: "58", name: "Argamassa cimento/areia", density: 2100 },
  { id: "59", name: "Argamassa cimento/cal/areia", density: 2000 },
  { id: "60", name: "Argamassa de cal e areia", density: 1800 },
  { id: "61", name: "Argamassa de gesso/estuque", density: 1200 },
  { id: "62", name: "Argila seca", density: 1600 },
  { id: "63", name: "Argila úmida", density: 1900 },
  { id: "64", name: "Argila xistosa", density: 2600 },
  { id: "65", name: "Arroz", density: 800 },
  { id: "66", name: "Arsênico", density: 5700 },
  { id: "67", name: "Asfalto", density: 1300 },
  { id: "68", name: "Aveia", density: 400 },
  { id: "69", name: "Azeite", density: 920 },
  { id: "70", name: "Azoto ( 0º, atm )", density: 1.25 },
  { id: "71", name: "Bario", density: 3500 },
  { id: "72", name: "Barro", density: 1800 },
  { id: "73", name: "Basalto", density: 2800 },
  { id: "74", name: "Batata", density: 700 },
  { id: "75", name: "Benzina ( 0º )", density: 890 },
  { id: "76", name: "Bismuto fundido", density: 9780 },
  { id: "77", name: "Bismuto fundido fluido", density: 9000 },
  { id: "78", name: "Bismuto puro", density: 9780 },
  { id: "79", name: "Blenda de zinco", density: 4050 },
  { id: "80", name: "Bloco de argamassa", density: 1800 },
  { id: "81", name: "Boracita", density: 2950 },
  { id: "82", name: "Borax", density: 1730 },
  { id: "83", name: "Borracha Natural", density: 920 },
  { id: "84", name: "Borracha Neoprene (CR)", density: 1230 },
  { id: "85", name: "Borracha Nitrilica (NBR)", density: 1200 },
  { id: "86", name: "Borracha para juntas", density: 1500 },
  { id: "87", name: "Brita 0 - 5mm a 11mm", density: 1400 },
  { id: "88", name: "Brita 1 - 11mm a 22mm", density: 1400 },
  { id: "89", name: "Brita 2 - 22mm a 32mm", density: 1400 },
  { id: "90", name: "Brita basáltica", density: 1700 },
  { id: "91", name: "Brita Calcárea ou arenária", density: 1500 },
  { id: "92", name: "Brita corrida - Inferior a 35 mm", density: 1600 },
  { id: "93", name: "Brita granítica", density: 1600 },
  { id: "94", name: "Bronze", density: 8500 },
  { id: "95", name: "Bronze ( 3 a 10% de aluminio)", density: 7700 },
  { id: "96", name: "Bronze ( 8 a 14% de estanho)", density: 8700 },
  { id: "97", name: "Cadmio", density: 8640 },
  { id: "98", name: "Cal em pó", density: 1000 },
  { id: "99", name: "Cal hidratada", density: 1000 },
  { id: "100", name: "Cal seca ( argamassa )", density: 1400 },
  { id: "101", name: "Cal umida ( argamassa )", density: 1600 },
  { id: "102", name: "Cal virgem", density: 1000 },
  { id: "103", name: "Calcáreo compacto", density: 2500 },
  { id: "104", name: "Calcáreo leve", density: 1600 },
  { id: "105", name: "Cálcio", density: 1540 },
  { id: "106", name: "Cânhamo seco", density: 1200 },
  { id: "107", name: "Carbeto de calcio", density: 2220 },
  { id: "108", name: "Carvão antracita", density: 1550 },
  { id: "109", name: "Carvão de lenha branca", density: 300 },
  { id: "110", name: "Carvão de lenha vermelha", density: 400 },
  { id: "111", name: "Carvão em pedra", density: 1500 },
  { id: "112", name: "Carvão fossil", density: 1300 },
  { id: "113", name: "Carvão mineral em pó", density: 850 },
  { id: "114", name: "Carvão vegetal", density: 400 },
  { id: "115", name: "Cascalho de rocha seco", density: 1500 },
  { id: "116", name: "Cascalho de rocha úmido", density: 1800 },
  { id: "117", name: "Caulim", density: 2600 },
  { id: "118", name: "Centeio", density: 700 },
  { id: "119", name: "Cera", density: 960 },
  { id: "120", name: "Cerveja", density: 1010 },
  { id: "121", name: "Chumbo", density: 11340 },
  { id: "122", name: "Chumbo fundido", density: 10400 },
  { id: "123", name: "Cimento a granel", density: 1400 },
  { id: "124", name: "Cimento em po", density: 1400 },
  { id: "125", name: "Cimento em sacos", density: 1500 },
  { id: "126", name: "Cimento para pisos", density: 1800 },
  { id: "127", name: "Cimento-Amianto", density: 1900 },
  { id: "128", name: "Cinabro", density: 8100 },
  { id: "129", name: "Clicker de cimento", density: 1600 },
  { id: "130", name: "Cloreto de cálcio", density: 2150 },
  { id: "131", name: "Cloreto de sódio", density: 2160 },
  { id: "132", name: "Cloreto de Zinco", density: 2910 },
  { id: "133", name: "Cloro", density: 3.2 },
  { id: "134", name: "Cloroformio", density: 1480 },
  { id: "135", name: "Cobalto", density: 8900 },
  { id: "136", name: "Cobre", density: 8900 },
  { id: "137", name: "Cobre eletrolitico", density: 8900 },
  { id: "138", name: "Cobre fundido", density: 8800 },
  { id: "139", name: "Cobre fundido fluido", density: 8500 },
  { id: "140", name: "Cobre laminado", density: 8900 },
  { id: "141", name: "Cobre trefilado", density: 8900 },
  { id: "142", name: "Cola", density: 1270 },
  { id: "143", name: "Concreto ( argamassa )", density: 2200 },
  { id: "144", name: "Concreto armado", density: 2500 },
  { id: "145", name: "Concreto de argila expandida", density: 1500 },
  { id: "146", name: "Concreto Simples", density: 2400 },
  { id: "147", name: "Corda", density: 1000 },
  { id: "148", name: "Cortiça", density: 240 },
  { id: "149", name: "Cortiça aglomerada", density: 300 },
  { id: "150", name: "Cortiça natural", density: 240 },
  { id: "151", name: "Couro seco", density: 860 },
  { id: "152", name: "Cristal ( vidro )", density: 2500 },
  { id: "153", name: "Cristal artificial", density: 3000 },
  { id: "154", name: "Cristal de rocha puro", density: 2650 },
  { id: "155", name: "Cromo quim. Puro", density: 7190 },
  { id: "156", name: "Diamante ( bras. )", density: 3510 },
  { id: "157", name: "Diorito", density: 2800 },
  { id: "158", name: "Dolomita ( magnesita )", density: 2800 },
  { id: "159", name: "Entulho de obras", density: 1500 },
  { id: "160", name: "Escoria de alto forno", density: 2200 },
  { id: "161", name: "Escória de alto-forno", density: 2200 },
  { id: "162", name: "Esmeralda ( verde )", density: 2700 },
  { id: "163", name: "Esmerilho", density: 4000 },
  { id: "164", name: "Espato calcareo", density: 2700 },
  { id: "165", name: "Essências diversas", density: 900 },
  { id: "166", name: "Estanho", density: 7300 },
  { id: "167", name: "Estruque de argamassa de cal", density: 1800 },
  { id: "168", name: "Estruque de argamassa de cimento", density: 2000 },
  { id: "169", name: "Fecula", density: 1500 },
  { id: "170", name: "Feldspato", density: 2550 },
  { id: "171", name: "Ferro comum", density: 7800 },
  { id: "172", name: "Ferro forjado", density: 7800 },
  { id: "173", name: "Ferro fundido", density: 7200 },
  { id: "174", name: "Ferro fundido fluido", density: 6900 },
  { id: "175", name: "Ferro fundido homogêneo", density: 7200 },
  { id: "176", name: "Ferro gusa branco", density: 7600 },
  { id: "177", name: "Ferro gusa cinza", density: 7100 },
  { id: "178", name: "Ferro gusa fundido ( media )", density: 7250 },
  { id: "179", name: "Ferro gusa fundido fluido", density: 7000 },
  { id: "180", name: "Ferro magnetico natural", density: 5100 },
  { id: "181", name: "Ferro quim. Puro", density: 7860 },
  { id: "182", name: "Fosfato de calcio", density: 3100 },
  { id: "183", name: "Fosforo amarelo branco", density: 1830 },
  { id: "184", name: "Fosforo cristalizado", density: 2200 },
  { id: "185", name: "Fosforo vermelho", density: 2200 },
  { id: "186", name: "Fundo de pedreira", density: 1600 },
  { id: "187", name: "Galena de chumbo", density: 7500 },
  { id: "188", name: "Gasolina ( 15º )", density: 720 },
  { id: "189", name: "Gelo", density: 920 },
  { id: "190", name: "Gêsso calcinado", density: 1200 },
  { id: "191", name: "Gêsso comprimido", density: 1800 },
  { id: "192", name: "Gesso em pó", density: 1200 },
  { id: "193", name: "Gesso hidratado (EM BLOCO)", density: 1200 },
  { id: "194", name: "Gêsso impast. seco", density: 1200 },
  { id: "195", name: "Gêsso peneirado", density: 1100 },
  { id: "196", name: "Glicerina", density: 1260 },
  { id: "197", name: "Gnaisse", density: 2700 },
  { id: "198", name: "Gneiss do R. de Janeiro", density: 2700 },
  { id: "199", name: "Grafite", density: 2200 },
  { id: "200", name: "Granito", density: 2700 },
  { id: "201", name: "Graxa", density: 900 },
  { id: "202", name: "Gres", density: 2200 },
  { id: "203", name: "Guta-percha", density: 970 },
  { id: "204", name: "Hidrogênio ( 0º, atm )", density: 0.09 },
  { id: "205", name: "Hulha", density: 1300 },
  { id: "206", name: "Hypalon (CE)", density: 1200 },
  { id: "207", name: "Iôdo", density: 4930 },
  { id: "208", name: "Lã de carneiro", density: 1300 },
  { id: "209", name: "Lajotas cerâmicas", density: 1800 },
  { id: "210", name: "Latão", density: 8400 },
  { id: "211", name: "Lava basaltica", density: 2800 },
  { id: "212", name: "Leite ( 15º )", density: 1030 },
  { id: "213", name: "Lenha", density: 500 },
  { id: "214", name: "Madeira (Angico)", density: 800 },
  { id: "215", name: "Madeira (Aroeira do sertão)", density: 1100 },
  { id: "216", name: "Madeira (Cabriuva)", density: 950 },
  { id: "217", name: "Madeira (Canela)", density: 700 },
  { id: "218", name: "Madeira (Cedro)", density: 500 },
  { id: "219", name: "Madeira (Imbuia)", density: 650 },
  { id: "220", name: "Madeira (Ipê)", density: 1050 },
  { id: "221", name: "Madeira (Jacaranda)", density: 850 },
  { id: "222", name: "Madeira (Jatoba)", density: 950 },
  { id: "223", name: "Madeira (Jequitiba)", density: 750 },
  { id: "224", name: "Madeira (Peroba)", density: 800 },
  { id: "225", name: "Madeira (Pinho brasileiro)", density: 500 },
  { id: "226", name: "Madeiras de dureza média", density: 700 },
  { id: "227", name: "Madeiras duras para estruturas", density: 900 },
  { id: "228", name: "Madeiras leves", density: 450 },
  { id: "229", name: "Magnesia", density: 3580 },
  { id: "230", name: "Magnesio", density: 1740 },
  { id: "231", name: "Manganês", density: 7430 },
  { id: "232", name: "Manteiga", density: 920 },
  { id: "233", name: "Marfim", density: 1800 },
  { id: "234", name: "Mármore", density: 2700 },
  { id: "235", name: "Mármore comum", density: 2700 },
  { id: "236", name: "Mármore de carrara", density: 2700 },
  { id: "237", name: "Marroada", density: 1600 },
  { id: "238", name: "Metal branco", density: 7300 },
  { id: "239", name: "Metal delta", density: 8600 },
  { id: "240", name: "Milho em grão", density: 750 },
  { id: "241", name: "Minério de ferro", density: 3000 },
  { id: "242", name: "Mistura", density: 1800 },
  { id: "243", name: "Naftalina", density: 1150 },
  { id: "244", name: "Neve", density: 120 },
  { id: "245", name: "Niquel", density: 8900 },
  { id: "246", name: "Nitrato do Chile", density: 2170 },
  { id: "247", name: "Óleo de algodão ( 15º )", density: 920 },
  { id: "248", name: "Óleo de cânfora", density: 990 },
  { id: "249", name: "Óleo de linhaça", density: 930 },
  { id: "250", name: "Óleo de oliva", density: 920 },
  { id: "251", name: "Óleo de ricino", density: 960 },
  { id: "252", name: "Óleo de terebentina", density: 870 },
  { id: "253", name: "Osso", density: 1800 },
  { id: "254", name: "Ouro fundido", density: 19300 },
  { id: "255", name: "Ouro laminado", density: 19300 },
  { id: "256", name: "Ouro puro", density: 19300 },
  { id: "257", name: "Óxido de calcio", density: 3300 },
  { id: "258", name: "Paládio", density: 12000 },
  { id: "259", name: "Palha ( em feixe )", density: 100 },
  { id: "260", name: "Papel", density: 1000 },
  { id: "261", name: "Parafina", density: 900 },
  { id: "262", name: "Parede de pedra", density: 2200 },
  { id: "263", name: "Parede de tijolos cheios", density: 1800 },
  { id: "264", name: "Parede de tijolos furados", density: 1300 },
  { id: "265", name: "Pedra calcarea", density: 2500 },
  { id: "266", name: "Pedra fogo", density: 2600 },
  { id: "267", name: "Pedra pome", density: 900 },
  { id: "268", name: "Pedra sabão", density: 2700 },
  { id: "269", name: "Petróleo", density: 800 },
  { id: "270", name: "Pirita ( de ferro )", density: 5000 },
  { id: "271", name: "Plástico em chapas e canos", density: 1350 },
  { id: "272", name: "Platina", density: 21450 },
  { id: "273", name: "Pó de pedra", density: 1500 },
  { id: "274", name: "Porcelana", density: 2300 },
  { id: "275", name: "Potássio", density: 860 },
  { id: "276", name: "Prata fundida", density: 10500 },
  { id: "277", name: "Prata fundida fluido", density: 9300 },
  { id: "278", name: "Prata laminada", density: 10500 },
  { id: "279", name: "Rachão", density: 1600 },
  { id: "280", name: "Rádio", density: 5000 },
  { id: "281", name: "Rebôlo", density: 2000 },
  { id: "282", name: "Resina", density: 1100 },
  { id: "283", name: "Rocha marroada", density: 1600 },
  { id: "284", name: "Sal gema", density: 2170 },
  { id: "285", name: "Salitre", density: 2100 },
  { id: "286", name: "Seixo arenoso", density: 1700 },
  { id: "287", name: "Seixo de pedra-pome", density: 800 },
  { id: "288", name: "Siderita", density: 3800 },
  { id: "289", name: "Silica seca", density: 2200 },
  { id: "290", name: "Silica umida", density: 2600 },
  { id: "291", name: "Sódio", density: 970 },
  { id: "292", name: "Sulfato de carbono ( 0º, atm )", density: 2.6 },
  { id: "293", name: "Sulfato de sodio", density: 2680 },
  { id: "294", name: "Sulfureto de carbono ( 15º )", density: 1260 },
  { id: "295", name: "Talco", density: 2700 },
  { id: "296", name: "Terra apiloada seca", density: 1600 },
  { id: "297", name: "Terra apiloada úmida", density: 2000 },
  { id: "298", name: "Terra arenosa", density: 1600 },
  { id: "299", name: "Terra argilosa seca", density: 1600 },
  { id: "300", name: "Terra silicosa seca", density: 1400 },
  { id: "301", name: "Terra vegetal seca", density: 1300 },
  { id: "302", name: "Terra vegetal úmida", density: 1800 },
  { id: "303", name: "Tijolo bem cozido", density: 1800 },
  { id: "304", name: "Tijolo comum", density: 1600 },
  { id: "305", name: "Tijolo de carvão prensado", density: 1200 },
  { id: "306", name: "Tijolo furado", density: 1100 },
  { id: "307", name: "Tijolo maciço", density: 1800 },
  { id: "308", name: "Tijole poroso", density: 1200 },
  { id: "309", name: "Tijolo sílico-calcáreo", density: 1900 },
  { id: "310", name: "Tijolo vitrificado", density: 2200 },
  { id: "311", name: "Topázio", density: 3500 },
  { id: "312", name: "Trigo", density: 760 },
  { id: "313", name: "Tungstênio", density: 19300 },
  { id: "314", name: "Turfa", density: 400 },
  { id: "315", name: "Turmalina", density: 3000 },
  { id: "316", name: "Vapor de água ( 100º, atm )", density: 0.6 },
  { id: "317", name: "Vidro", density: 2500 },
  { id: "318", name: "Vidro Cristal", density: 2600 },
  { id: "319", name: "Vidro de garrafa", density: 2500 },
  { id: "320", name: "Vidro de janela", density: 2500 },
  { id: "321", name: "Vidro flint", density: 2900 },
  { id: "322", name: "Vidro verde", density: 2500 },
  { id: "323", name: "Vinho", density: 1000 },
  { id: "324", name: "Viton (FPM)", density: 1800 },
  { id: "325", name: "Zamak", density: 6600 },
  { id: "326", name: "Zinco", density: 7140 },
  { id: "327", name: "Zinco fundido", density: 6900 },
  { id: "328", name: "Zinco fundido fluido", density: 6500 },
  { id: "329", name: "Zinco laminado", density: 7200 },
  { id: "330", name: "Zircônio ( 18º, 95% )", density: 6400 },
];

export default function ConversorPesoVolumeCalculator() {
  const [selectedProductId, setSelectedProductId] = useState<string>("1");
  const [searchQuery, setSearchQuery] = useState("");
  const [conversionType, setConversionType] = useState<"weightToVolume" | "volumeToWeight">("volumeToWeight");
  const [inputValue, setInputValue] = useState<string>("12");
  const [calculatedValue, setCalculatedValue] = useState<number | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  // Filter products based on search
  const filteredProducts = PRODUCTS.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedProduct = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  function handleConvert(e: React.FormEvent) {
    e.preventDefault();
    const val = parseFloat(inputValue.replace(",", "."));
    if (isNaN(val) || val <= 0) return;

    let result = 0;
    const density = selectedProduct.density;

    if (conversionType === "volumeToWeight") {
      // Volume (m3) -> Weight (ton)
      // weight (kg) = volume (m3) * density (kg/m3)
      // weight (ton) = weight (kg) / 1000
      result = (val * density) / 1000;
    } else {
      // Weight (ton) -> Volume (m3)
      // weight (kg) = weight (ton) * 1000
      // volume (m3) = weight (kg) / density (kg/m3)
      result = density > 0 ? (val * 1000) / density : 0;
    }

    setCalculatedValue(result);
    setHasCalculated(true);
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 no-print">
        {/* Left Side: Explanatory Content */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Como funciona a conversão?</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Diferentes cargas ocupam espaços diferentes para o mesmo peso. Por exemplo, 1 m³ de <strong>Aço</strong> pesa 
              7,8 toneladas, enquanto 1 m³ de <strong>Água</strong> pesa exatamente 1 tonelada.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Este conversor calcula automaticamente as equivalências usando a massa específica de referência de <strong>330 materiais</strong> 
              da tabela técnica clássica de engenharia e logística.
            </p>
            <div className="pt-2 border-t border-slate-200">
              <span className="text-xs font-bold text-slate-500 block mb-1">Fórmulas Utilizadas:</span>
              <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs font-mono text-slate-700 space-y-1">
                <div>• Peso (ton) = Vol (m³) × Densidade (kg/m³) / 1.000</div>
                <div>• Volume (m³) = [Peso (ton) × 1.000] / Densidade (kg/m³)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Card Form */}
        <div className="lg:col-span-7">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
            <form onSubmit={handleConvert} className="space-y-6">
              {/* Product Selection with Search Filter */}
              <div className="space-y-2">
                <label htmlFor="productId" className="block text-sm font-bold text-slate-900">
                  Tipo de carga (Selecione o Produto):
                </label>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="🔍 Digite para pesquisar entre os 330 materiais..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary text-slate-800"
                  />
                  <select
                    id="productId"
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary text-slate-800 bg-white text-sm"
                    required
                  >
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} — ({p.density.toLocaleString("pt-BR")} kg/m³)
                        </option>
                      ))
                    ) : (
                      <option disabled>Nenhum produto encontrado</option>
                    )}
                  </select>
                </div>
              </div>

              {/* Conversion Direction Selection */}
              <div className="space-y-3">
                <span className="block text-sm font-bold text-slate-900">O que deseja fazer:</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label
                    className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${
                      conversionType === "weightToVolume"
                        ? "border-secondary bg-secondary/5 text-slate-900 font-semibold"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="conversionType"
                      checked={conversionType === "weightToVolume"}
                      onChange={() => {
                        setConversionType("weightToVolume");
                        setHasCalculated(false);
                      }}
                      className="accent-secondary h-4 w-4"
                    />
                    <span className="text-sm">Informar peso (ton) para obter cubagem</span>
                  </label>

                  <label
                    className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${
                      conversionType === "volumeToWeight"
                        ? "border-secondary bg-secondary/5 text-slate-900 font-semibold"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="conversionType"
                      checked={conversionType === "volumeToWeight"}
                      onChange={() => {
                        setConversionType("volumeToWeight");
                        setHasCalculated(false);
                      }}
                      className="accent-secondary h-4 w-4"
                    />
                    <span className="text-sm">Informar cubagem (m³) para obter o peso</span>
                  </label>
                </div>
              </div>

              {/* Numeric Input */}
              <div className="space-y-2">
                <label htmlFor="inputValue" className="block text-sm font-bold text-slate-900">
                  {conversionType === "volumeToWeight"
                    ? "Valor da cubagem (m³) a ser convertido:"
                    : "Valor do peso (toneladas) a ser convertido:"}
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <input
                    id="inputValue"
                    type="text"
                    required
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      setHasCalculated(false);
                    }}
                    placeholder="Ex: 12"
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary text-slate-800 text-lg font-semibold"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <span className="text-slate-400 font-bold text-sm">
                      {conversionType === "volumeToWeight" ? "m³" : "ton"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-secondary hover:bg-secondary-hover text-white font-black py-4 px-6 rounded-xl transition-all cursor-pointer shadow-lg shadow-secondary/15 flex items-center justify-center gap-2 text-base hover:scale-[1.01]"
              >
                Converter
              </button>
            </form>

            {/* Calculations Result Output */}
            {hasCalculated && calculatedValue !== null && (
              <div className="bg-slate-950 text-white p-6 rounded-xl border border-slate-800 space-y-4 animate-fadeIn">
                <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Produto Selecionado</span>
                    <span className="text-sm font-semibold text-slate-300">{selectedProduct.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Peso Específico</span>
                    <span className="text-sm font-mono font-semibold text-secondary">
                      {selectedProduct.density.toLocaleString("pt-BR")} kg/m³
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">
                    Resultado Equivalente Convertido
                  </span>
                  <div className="text-4xl font-extrabold text-white flex items-baseline gap-2">
                    {calculatedValue.toLocaleString("pt-BR", {
                      minimumFractionDigits: 3,
                      maximumFractionDigits: 3,
                    })}
                    <span className="text-lg text-secondary font-black">
                      {conversionType === "volumeToWeight" ? "toneladas" : "m³ (Volume)"}
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        window.print();
                      }
                    }}
                    className="flex-grow bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    🖨️ Imprimir Relatório
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Print-Only Template */}
      <PrintReportTemplate
        reportTitle="Relatório de Equivalência de Peso e Volume"
        showSignatures={false}
        parameters={[
          { label: "Material da Carga", value: selectedProduct.name },
          { label: "Peso Específico de Referência", value: `${selectedProduct.density.toLocaleString("pt-BR")} kg/m³` },
          {
            label: "Valor de Entrada Informado",
            value: `${parseFloat(inputValue.replace(",", ".")).toLocaleString("pt-BR")} ${
              conversionType === "volumeToWeight" ? "m³" : "ton"
            }`,
          },
        ]}
        results={[
          {
            label: "RESULTADO DA EQUIVALÊNCIA CONVERTIDA",
            value: `${calculatedValue?.toLocaleString("pt-BR", { minimumFractionDigits: 3 })} ${
              conversionType === "volumeToWeight" ? "ton (Peso)" : "m³ (Volume)"
            }`,
            isHighlight: true,
          },
        ]}
      />
    </>
  );
}
