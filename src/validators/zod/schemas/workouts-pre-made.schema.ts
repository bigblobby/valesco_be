import { z } from 'zod';

export const workoutPreMadeGetAllSchema = z.object({
    query: z.object({
        collection: z.enum([
            'crossfit-main-daily-wods-archive-2001',
            'crossfit-main-daily-wods-archive-2002',
            'crossfit-main-daily-wods-archive-2003',
            'crossfit-main-daily-wods-archive-2004',
            'crossfit-main-daily-wods-archive-2005',
            'crossfit-main-daily-wods-archive-2006',
            'crossfit-main-daily-wods-archive-2007',
            'crossfit-main-daily-wods-archive-2008',
            'crossfit-main-daily-wods-archive-2009',
            'crossfit-main-daily-wods-archive-2010',
            'crossfit-main-daily-wods-archive-2011',
            'crossfit-main-daily-wods-archive-2012',
            'crossfit-main-daily-wods-archive-2013',
            'crossfit-main-daily-wods-archive-2014',
            'crossfit-main-daily-wods-archive-2015',
            'crossfit-main-daily-wods-archive-2016',
            'crossfit-main-daily-wods-archive-2017',
            'crossfit-main-daily-wods-archive-2018',
            'crossfit-main-daily-wods-archive-2019',
            'crossfit-main-daily-wods-archive-2020',
            'crossfit-main-daily-wods-archive-2021',
            'crossfit-main-daily-wods-archive-2022',
            'crossfit-main-daily-wods-archive-2023',
            'crossfit-main-daily-wods-archive-2024',
            'crossfit-main-hero-wods',
            'crossfit-linchpin-daily-wods',
            'crossfit-linchpin-monster-mash-wods',
            'crossfit-mayhem-daily-wods',
            'push-herk-wods',
        ]),
    }),
});